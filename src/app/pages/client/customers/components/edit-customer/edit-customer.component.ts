import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Observable, Subscription } from 'rxjs';
import { Customer } from '../../model';
import { CustomerService } from '../../services/customers.service';
import { editCustomerModalData, editCustomerForm, errors } from './edit-customer.constants';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCustomerComponent implements OnInit, OnDestroy {
  @ViewChild("form", { static: false })
  form: DynamicFormComponent;

  @Input() customerId: number;
  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = editCustomerModalData;
  editCustomerForm;
  errors = errors;
  displayForm: boolean;
  buttonDisabled: ButtonState = "INVALID";
  subscriptions: Subscription[] = [];

  customer$: Observable<Customer>;
  customer: Customer;


  constructor(
    private readonly ref: ChangeDetectorRef,
    private readonly customerService: CustomerService
  ) { }

  ngOnInit() {
    this.fetchCustomer()
  }

  fetchCustomer(){
    this.subscriptions.push(
      this.customerService.fetchSingleCustomer(this.customerId).subscribe((response) => {
        this.displayForm = true
        this.customer = response;

        editCustomerForm[0].defaultValue = response.fullName.split(' ')[0];
        editCustomerForm[1].defaultValue = response.fullName.split(' ')[1];
        editCustomerForm[2].defaultValue = response.mobileNumber;
        editCustomerForm[3].defaultValue = response.email;
        editCustomerForm[4].defaultValue = response.receiveEReceipt;

        this.editCustomerForm = editCustomerForm;
        this.ref.markForCheck();

      })
    )

  }

  editCustomer(){

    const { firstName, lastName, mobileNumber, email, receiveEReceipt } = this.form.form.value;
    const payload: Partial<Customer> = {
      id: this.customerId,
      fullName: firstName + ' ' + lastName,
      countryCode: mobileNumber.substr(0, 4),
      mobileNumber,
      email,
      receiveEReceipt,
    }

    console.log(payload)

    this.subscriptions.push(
      this.customerService.updateCustomer(this.customerId, payload).subscribe(
        (response) => {
          this.closeModal.emit();
          this.refreshData.emit();
        }
      )
    )

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }

}
