import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { paymentOptionModalData, paymentOptionForm, errors } from './billing-payment-update.constants';

@Component({
  selector: 'app-billing-payment-update',
  templateUrl: './billing-payment-update.component.html',
  styleUrls: ['./billing-payment-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingPaymentUpdateComponent implements OnInit, AfterViewInit {
  @ViewChild(DynamicFormComponent, { static: true })
  form: DynamicFormComponent;

  @Output() modalClose = new EventEmitter();

  modalData = paymentOptionModalData;
  paymentUpdateForm = paymentOptionForm;
  errors = errors;
  buttonDisabled: ButtonState = "INVALID";
  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.form)

    // Subscribe to form validation status
    this.subscriptions.push(
      this.form?.form?.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  selectPayment(){
    this.modalClose.emit(this.form.form.value.paymentMethod)
  }

}
