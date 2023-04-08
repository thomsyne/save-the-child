import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { SubscriptionModel } from '../../model';
import { SubscriptionsService } from '../../services/subscriptions.service';
import {
  createSubscriptionModalData,
  createSubscriptionForm,
  errors
} from './create-subscription.constants';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSubscriptionComponent implements OnInit {

  @ViewChild(DynamicFormComponent, { static: true })
  form: DynamicFormComponent;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = createSubscriptionModalData;
  createMerchantForm = createSubscriptionForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  constructor(
    private subscriptionsService: SubscriptionsService,
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

  addSubscription() {
    const {
      name,
      fee,
      maxNumberOfOtherDevices,
      maxNumberOfStores,
      maxNumberOfUsers,
      maxNumberOfPOSDevices,
      trialPeriodDays,
      paymentCycle,
      type,
      active
    } =
    this.form.formValues;

    const createForm: Partial<SubscriptionModel> = {
      name,
      fee,
      maxNumberOfOtherDevices,
      maxNumberOfStores,
      maxNumberOfUsers,
      maxNumberOfPOSDevices,
      trialPeriodDays,
      paymentCycle,
      type,
      active,
    };

    this.subscriptionsService.createSubscription(createForm).subscribe(
      (res) => {
        this.closeModal.emit();
        this.refreshData.emit();
    });
  }

}
