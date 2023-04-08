import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { Invoice, PayAdvance, StorageService } from "@ga/core";
import { DynamicFormComponent, Field } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { AlertService } from "@ga/utility";
import { Observable, Subscription } from "rxjs";
import { MerchantsService } from "src/app/pages/admin/merchants/services/merchants.service";
import { SubscriptionModel } from "src/app/pages/admin/subscriptions";
import { SubscriptionsService } from "src/app/pages/admin/subscriptions/services/subscriptions.service";
import { PayNowService } from "../../pay-now.service";
import { errors, payAdvanceFormData } from "./rexpay-advance.constants";
import { Merchant } from "src/app/pages/admin/merchants";

@Component({
  selector: "app-rexpay-advance",
  templateUrl: "./rexpay-advance.component.html",
  styleUrls: ["./rexpay-advance.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RexpayAdvanceComponent implements OnInit {
  
  @ViewChild("payAdvanceFormRef", { static: false })
  payAdvanceForm: DynamicFormComponent;

  merchantId: number;
  merchantData: Merchant;
  merchantFee: number;
  merchant$: Observable<Merchant>;
  subscriptionsPlans: SubscriptionModel[];
  currentSubscription: SubscriptionModel;

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
    private merchantService: MerchantsService
  ) {}

  ngOnInit() {
    this.merchantId =
      this.storageService.getLoggedInUser().userDetails.merchant.id;
    this.getMerchantData();
    this.getPendingInvoice();
  }

  getMerchantData() {
    this.merchant$ = this.merchantService.fetchSingleMerchant(this.merchantId);
    this.merchant$.subscribe((res) => {
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

        setTimeout(() => {
          document.getElementById("initiate-pay-btn").click();
        }, 100);
      },
    });
  }

  change() {
    this.merchantData.currentSubscriptionPlan.fee =
      this.merchantFee * Number(this.payAdvanceForm.form.value.paymentCycle);
  }
}
