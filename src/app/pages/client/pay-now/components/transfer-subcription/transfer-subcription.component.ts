import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Merchant, Invoice, StorageService, PayAdvance } from '@ga/core';
import { DynamicFormComponent, Field } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { Observable, Subscription } from 'rxjs';
import { MerchantsService } from 'src/app/pages/admin/merchants/services/merchants.service';
import { SubscriptionModel } from 'src/app/pages/admin/subscriptions';
import { SubscriptionsService } from 'src/app/pages/admin/subscriptions/services/subscriptions.service';
import { PayNowService } from '../../pay-now.service';
import { errors, payAdvanceFormData, updateSubscriptionPlanFormData } from './transfer-subcription.constants';

@Component({
  selector: 'app-transfer-subcription',
  templateUrl: './transfer-subcription.component.html',
  styleUrls: ['./transfer-subcription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferSubcriptionComponent implements OnInit {

  @ViewChild("updateSubscriptionFormRef", { static: false }) updateForm: DynamicFormComponent;

  @ViewChild("payAdvanceFormRef", { static: false })
  payAdvanceForm: DynamicFormComponent;

  merchantId: number;
  merchantData: Merchant;
  merchant: any;
  subscriptionsPlans: SubscriptionModel[];
  currentSubscription: SubscriptionModel;

  pendingInvoice: Invoice;

  showEditSubscription = false;

  updateSubscriptionForm: Field[] = [];
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];

  merchantFee: number;
  invoiceGenerated: boolean = false;
  payAdvanceFormFields: Field[] = payAdvanceFormData;

  constructor(
    private payService: PayNowService,
    private ref: ChangeDetectorRef,
    private storageService: StorageService,
    private alertService: AlertService,
    private merchantService: MerchantsService,
    private subscriptionService: SubscriptionsService,
    private router: Router
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
    this.merchant = this.merchantService.fetchSingleMerchant(this.merchantId);
    this.merchant.subscribe(res => {
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

  payAdvance() {
    //this.router.navigate(['/pay/transfer/virtual-account'], { queryParams: { amount: this.merchantData.currentSubscriptionPlan.fee }})
    let payload: PayAdvance = {
      merchantId: this.storageService.getLoggedInUser().userDetails.merchant.id,
      numberOfRenewals: Number(this.merchantData.currentSubscriptionPlan.fee),
    };

    console.log(payload.numberOfRenewals)

    this.payService.initiatePayAdvance(payload).subscribe({
      next: (res) => {
        this.alertService.success(
          "Invoice generated. Procceding to payment..."
        );

        this.pendingInvoice = {
          ...this.pendingInvoice,
          reference: res.reference,
          id: res.id,
        };

        this.invoiceGenerated = true;

        this.ref.detectChanges();

        let payload = {
          id: res.id,
          reference: res.reference
        }

        this.payService.currentInvoiceDetails.next(payload)

        this.router.navigate(['/pay/transfer/virtual-account'], { queryParams: { amount: this.merchantData.currentSubscriptionPlan.fee }})
      },
    });
  }

  change() {
    this.merchantData.currentSubscriptionPlan.fee =
      this.merchantFee * Number(this.payAdvanceForm.form.value.paymentCycle);
  }

}
