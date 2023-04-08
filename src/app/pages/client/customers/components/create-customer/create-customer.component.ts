import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { Customer } from '../..';
import { CustomerService } from '../../services/customers.service';
import { createCustomerForm, createCustomerModalData, errors } from './create-customer.constants';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCustomerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DynamicFormComponent, { static: true })
  form: DynamicFormComponent;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = createCustomerModalData;
  createUserForm = createCustomerForm;
  errors = errors;
  buttonDisabled: ButtonState = "INVALID";
  subscriptions: Subscription[] = [];

  constructor(
    private customersService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Subscribe to form validation status
    this.subscriptions.push(
      this.form.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  createCustomer() {
    const { firstName, lastName, email, mobileNumber, receiveEReceipt } = this.form.form.value;

    const form: Partial<Customer> = {
      fullName: firstName + ' ' + lastName,
      email,
      mobileNumber,
      receiveEReceipt,
      countryCode: '+234',
    };

    this.subscriptions.push(
      this.customersService.createCustomer(form).subscribe((res) => {
        this.closeModal.emit();
        this.refreshData.emit();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
