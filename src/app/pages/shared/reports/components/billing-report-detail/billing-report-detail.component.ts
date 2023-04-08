import { SubscriptionUpdate } from './../../model';
import { StorageService } from './../../../../../core/services/storage.service';
import { AlertService } from './../../../../../shared/utility/alert/alert.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingReport } from '../../model';
import { ReportsService } from '../../services/reports.service';
import { PayNowService } from 'src/app/pages/client/pay-now/pay-now.service';
import { MerchantsService } from 'src/app/pages/admin/merchants/services/merchants.service';
import { Merchant } from '@ga/core';

@Component({
  selector: 'app-billing-report-detail',
  templateUrl: './billing-report-detail.component.html',
  styleUrls: ['./billing-report-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingReportDetailComponent implements OnInit {

  billingId: number;
  billingInfo: BillingReport;
  transactionReference: number;
  isUserGAAdmin: boolean = false;
  isMerchantAdmin: boolean = false;
  canUpdateSubscription: boolean = false;
  displaySubscriptionModal: boolean = false;
  displayPaymentModal: boolean = false;
  invoiceData: Partial<SubscriptionUpdate>;
  merchant: any;
  merchantId: number;
  merchantData: Merchant;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private reportsService: ReportsService,
    private payService: PayNowService,
    private storageService: StorageService,
    private merchantService: MerchantsService,
  ) { }

  ngOnInit(): void {
    this.isMerchantAdmin = this.storageService.isMerchantAdmin()
    if (this.isMerchantAdmin) {
      this.merchantId = this.storageService.getLoggedInUser().userDetails.merchant?.id;
    }
    this.isUserGAAdmin = this.storageService.isGaAdmin();
    this.billingId = this.route.snapshot.params['id'];
    this.transactionReference = this.route.snapshot.params['reference']
    this.getBillingDetail(this.billingId);
    this.canUpdateSubscription = this.storageService.getPermissons().includes('CAN_MANUALLY_UPDATE_SUBSCRIPTION_STATUS')

    if(this.isMerchantAdmin){
      this.getMerchantData()
    }

  }

  getMerchantData() {

    this.merchant = this.merchantService.fetchSingleMerchant(this.merchantId);
    this.merchant.subscribe((res) => {
      this.merchantData = res;
    });
  }

  getBillingDetail(billingId: number) {
    this.reportsService.fetchSingleBillingReport(billingId).subscribe(res => {
      this.billingInfo = res;

      this.invoiceData = {
        id: this.billingInfo.id,
        amount: this.billingInfo.amount
      }

      if (this.router.url.includes("status") && !this.transactionReference) this.getPaymentStatus();
      if (this.router.url.includes("status") && this.transactionReference) this.getVirtualPaymentStatus();
      this.ref.markForCheck();
    })
  }

  getPaymentStatus(){
    const form = {
      reference: this.billingInfo.reference,
    };

    this.reportsService.getPaymentStatus(form).subscribe(
      (res) => {
        console.log(res);
        this.billingInfo.paymentStatus = res["paymentStatus"];
        this.billingInfo.paymentMethod = res["paymentMethod"];
        this.ref.markForCheck();

      },
      (err) => {
        console.log(err);
        this.alertService.error(err, true);
      }
    );
  }

  getVirtualPaymentStatus(){
    const form = {
      invoiceReference: this.billingInfo.reference,
    };

    this.reportsService.getVirtualPaymentStatus(form).subscribe(
      (res: any) => {
        console.log('shda')
        console.log(res);
        this.billingInfo.paymentStatus = res?.data?.paymentStatus;
        this.billingInfo.paymentMethod = res?.data?.paymentMethod;
        this.ref.markForCheck();

      },
      (err) => {
        console.log(err);
        this.alertService.error(err, true);
      }
    );
  }

  advanceTransfer(){
    setTimeout(() => {
      this.alertService.warn('Routing to Payment Page')
    }, 1000);

    let payload = {
      id: this.billingInfo.id,
      reference: this.billingInfo.reference
    }

    this.payService.currentInvoiceDetails.next(payload)

    this.router.navigate(['/pay/transfer/virtual-account'], { queryParams: { amount: this.merchantData.currentSubscriptionPlan.fee }})
  }

  cancelSubscription(){
    this.reportsService.cancelInvoice(this.billingInfo.reference).subscribe(
      (res) => {
        this.alertService.success('Subscription cancelled successfully')
        this.getBillingDetail(this.billingId)
      }
    )
  }

  selectPayment(paymentOption: string){
    if (paymentOption == 'Card'){
      document.getElementById("initiate-pay-btn").click();
    } else if (paymentOption == 'OnlineAccountTransfer') {
      document.getElementById("initiate-transfer-payment").click();
    } else {
      null
    }
    this.togglePaymentModal()
  }

  togglePaymentModal(){
    this.displayPaymentModal = !this.displayPaymentModal
  }

  toggleSubscriptionModal(){
    this.displaySubscriptionModal = !this.displaySubscriptionModal
  }

}
