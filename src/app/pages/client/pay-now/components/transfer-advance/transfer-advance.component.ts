import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Merchant, Invoice, StorageService, PayAdvance } from '@ga/core';
import { DynamicFormComponent, Field } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { Observable, Subscription } from 'rxjs';
import { MerchantsService } from 'src/app/pages/admin/merchants/services/merchants.service';
import { SubscriptionModel } from 'src/app/pages/admin/subscriptions';
import { PayNowService } from '../../pay-now.service';
import { payAdvanceFormData, errors } from '../rexpay-advance/rexpay-advance.constants';

@Component({
  selector: 'app-transfer-advance',
  templateUrl: './transfer-advance.component.html',
  styleUrls: ['./transfer-advance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferAdvanceComponent implements OnInit {

  @ViewChild("payAdvanceFormRef", { static: false })
  payAdvanceForm: DynamicFormComponent;

  merchantId: number;
  merchantData: Merchant;
  merchantFee: number;
  merchant$: Observable<Merchant>;
  subscriptionsPlans: SubscriptionModel[];
  currentSubscription: SubscriptionModel;

  merchant:any;

  pendingInvoice: Invoice = null;

  payAdvanceFormFields: Field[] = payAdvanceFormData;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  
  invoiceGenerated: boolean = false;

  constructor(
    private payService: PayNowService,
    private ref: ChangeDetectorRef,
    private storageService: StorageService,
    private alertService: AlertService,
    private merchantService: MerchantsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.merchantId =
      this.storageService.getLoggedInUser().userDetails.merchant.id;
    this.getMerchantData();
    this.getPendingInvoice();
  }

  getMerchantData() {

    this.merchant = this.merchantService.fetchSingleMerchant(this.merchantId);
    this.merchant.subscribe((res) => {
      this.merchantData = res;
      this.merchantFee = res.currentSubscriptionPlan.fee;
    });
  }

  getPendingInvoice() {
    this.payService.getUpcomingPayment(this.merchantId).subscribe({
      next: (res) => {
        this.pendingInvoice = res.data[0];
        this.ref.markForCheck();
      },
    });
  }

  payAdvance() {
    //this.router.navigate(['/pay/transfer/virtual-account'], { queryParams: { amount: this.merchantData.currentSubscriptionPlan.fee }})
    let payload: PayAdvance = {
      merchantId: this.storageService.getLoggedInUser().userDetails.merchant.id,
      numberOfRenewals: Number(this.payAdvanceForm.form.value.paymentCycle),
    };

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
