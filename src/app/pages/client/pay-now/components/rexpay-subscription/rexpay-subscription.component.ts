import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Invoice, Payment, StorageService } from '@ga/core';
import { DynamicFormComponent, Field } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { Observable, Subscription } from 'rxjs';
import { Merchant } from 'src/app/pages/admin/merchants';
import { MerchantsService } from 'src/app/pages/admin/merchants/services/merchants.service';
import { SubscriptionModel } from 'src/app/pages/admin/subscriptions';
import { SubscriptionsService } from 'src/app/pages/admin/subscriptions/services/subscriptions.service';
import { PayNowService } from '../../pay-now.service';
import {
  updateSubscriptionPlanFormData,
  errors
} from './rexpay-subscription.constants';

@Component({
  selector: 'app-rexpay-subscription',
  templateUrl: './rexpay-subscription.component.html',
  styleUrls: ['./rexpay-subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RexpaySubscriptionComponent implements OnInit {
  
  @ViewChild("updateSubscriptionFormRef", { static: false }) updateForm: DynamicFormComponent;

  merchantId: number;
  merchantData: Merchant;
  merchant$: Observable<Merchant>;
  subscriptionsPlans: SubscriptionModel[];
  currentSubscription: SubscriptionModel;

  pendingInvoice: Invoice;

  showEditSubscription = false;

  updateSubscriptionForm: Field[] = [];
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];

  constructor(
    private payService: PayNowService,
    private ref: ChangeDetectorRef,
    private storageService: StorageService,
    private alertService: AlertService,
    private merchantService: MerchantsService,
    private subscriptionService: SubscriptionsService,
  ) { }

  ngOnInit(): void {
    this.merchantId = this.storageService.getLoggedInUser().userDetails.merchant.id;
    this.getMerchantData();
    this.getPendingInvoice();
  }

  toggleCurrentDisplay() {
    this.showEditSubscription = !this.showEditSubscription;
  }

  getMerchantData() {
    this.merchant$ = this.merchantService.fetchSingleMerchant(this.merchantId);
    this.merchant$.subscribe(res => {
      this.merchantData = res;
      this.getAllSubscriptions();
    });
  }

  getPendingInvoice() {
    this.payService.getUpcomingPayment(this.merchantId).subscribe({
      next: (res) => {
        this.pendingInvoice = res.data[0];
        this.ref.markForCheck();
      }
    });
  }

  getAllSubscriptions() {
    this.subscriptionService.fetchAllSubscriptions().subscribe(res => {
      this.subscriptionsPlans = res;
      this.currentSubscription = this.subscriptionsPlans.find(
        sub => sub.name === this.merchantData.subscriptionPlan
      );
      let subscriptionPlanOptions = [];
      res.forEach((susbcription) => {
        subscriptionPlanOptions.push([susbcription.name, `${susbcription.name}`]);
      });
      updateSubscriptionPlanFormData[0].defaultValue = this.currentSubscription.name;
      updateSubscriptionPlanFormData[0].options = new Map(subscriptionPlanOptions)
      updateSubscriptionPlanFormData[1].defaultValue = this.merchantData.paymentCycle;
      this.updateSubscriptionForm = updateSubscriptionPlanFormData;
    });
  }

  updateSubscription() {
    const { subscriptionPlan, paymentCycle } = this.updateForm.form.value;
    this.merchantService.updateMerchantSubPlan(this.merchantId, subscriptionPlan).subscribe({
      next: (res) => {
        this.alertService.success('Subscription plan updated successfully');
        this.getMerchantData();
        this.toggleCurrentDisplay()
      }
    });
  }
}
