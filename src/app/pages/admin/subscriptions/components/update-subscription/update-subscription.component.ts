import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { Subscription } from 'rxjs';
import { SubscriptionModel } from '../../model';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { updateSubscriptionForm, errors } from './update-subscription.constants';

@Component({
  selector: 'app-update-subscription',
  templateUrl: './update-subscription.component.html',
  styleUrls: ['./update-subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateSubscriptionComponent implements OnInit, AfterViewInit {

  @ViewChild("updateForm", { static: false }) form: DynamicFormComponent;

  subscriptionId: number;
  subscription: SubscriptionModel;

  formData = updateSubscriptionForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private alertService: AlertService,
    private subscriptionsService: SubscriptionsService,
  ) { }

  ngOnInit(): void {
    this.subscriptionId = this.route.snapshot.params['id'];
    this.getSubscription(this.subscriptionId);
  }

  ngAfterViewInit() {
    // Subscribe to form validation status
  }

  getSubscription(id) {
    this.subscriptionsService.fetchSingleSubscription(id).subscribe(res => {
      this.subscription = res;
      this.formData[0].defaultValue = this.subscription.name;
      this.formData[1].defaultValue = this.subscription.fee;
      this.formData[2].defaultValue = this.subscription.maxNumberOfOtherDevices;
      this.formData[3].defaultValue = this.subscription.maxNumberOfStores;
      this.formData[4].defaultValue = this.subscription.maxNumberOfUsers;
      this.formData[5].defaultValue = this.subscription.maxNumberOfPOSDevices;
      this.formData[6].defaultValue = this.subscription.trialPeriodDays;
      this.formData[7].defaultValue = this.subscription.paymentCycle;
      this.formData[8].defaultValue = this.subscription.type.toLowerCase();
      this.formData[9].defaultValue = this.subscription.active;
      this.ref.markForCheck();
    });
  }

  updateSubscriptionStatus() {

    const payload: Partial<SubscriptionModel> = {
      ...this.subscription,
      active: !this.subscription.active
    };

    this.subscriptionsService.updateSingleSubscription(this.subscriptionId, payload).subscribe({
      next: (res) => {
        this.alertService.success("Subscription status updated successfully");
        this.router.navigateByUrl('/subscriptions');
      }
    });
  }

  updateSubscription() {
    const payload: Partial<SubscriptionModel> = this.form.form.value;
    payload.id = this.subscriptionId;

    this.subscriptionsService.updateSingleSubscription(this.subscriptionId, payload).subscribe({
      next: (res) => {
        this.alertService.success("Subscription updated successfully");
        this.router.navigateByUrl('/subscriptions');
      }
    });
  }

}
