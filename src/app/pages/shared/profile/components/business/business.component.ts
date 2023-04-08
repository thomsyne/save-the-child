import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { AccountLookup, BaseComponent, StorageService } from "@ga/core";
import { DynamicFormComponent } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { LoaderComponent } from "@ga/utility";
import { Observable, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Merchant, OTPPayload } from "src/app/pages/admin/merchants";
import { MerchantsService } from "src/app/pages/admin/merchants/services/merchants.service";
import {
  editBusinessForm,
  enterOTPModalData,
  otpFormFields,
  errors,
} from "./business.constants";

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessComponent extends BaseComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: false }) loader: LoaderComponent;
  @ViewChild("form", { static: false })
  accessForm: DynamicFormComponent;
  @ViewChild("OTPForm", { static: false })
  OTPValidateForm: DynamicFormComponent;

  showOTPModal: boolean;
  optFormField = otpFormFields;
  modalData = enterOTPModalData;
  businessForm = editBusinessForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  showBusinessForm: boolean;
  merchantId: number;
  merchantData$: Observable<Merchant>;

  prefillData: AccountLookup;
  accountDetails: AccountLookup;
  accountLookupFormStatus = false;

  merchant: Merchant;
  oTPResponse: OTPPayload;
  constructor(
    private storageService: StorageService,
    private merchantService: MerchantsService,
    private ref: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.merchantId =
      this.storageService.getLoggedInUser().userDetails.merchant.id;
    this.getMerchantDetails();
  }

  getMerchantDetails() {
    this.merchantData$ = this.merchantService.fetchSingleMerchant(
      this.merchantId
    );
    this.merchantData$.pipe(takeUntil(this.destroy$)).subscribe((merchant) => {
      this.merchant = merchant;
      this.businessForm[0].defaultValue = merchant.name;
      this.businessForm[1].defaultValue = merchant.contactPhoneNumber;
      this.businessForm[2].defaultValue = merchant.contactEmail;
      this.businessForm[3].defaultValue = merchant.address;
      this.businessForm[4].defaultValue = merchant.cacNumber;
      this.businessForm[5].defaultValue = merchant.bankVerificationNumber;
      // this.businessForm[6].defaultValue = merchant.accountName;
      // this.businessForm[7].defaultValue = merchant.accountNumber;
      // this.businessForm[8].defaultValue = merchant.bankCode;

      this.prefillData = {
        accountName: merchant.accountName,
        accountNumber: merchant.accountNumber,
        bankName: merchant.bankCode,
      };
    });
  }

  getAccountDetails(data: AccountLookup) {
    this.accountDetails = data;
    console.log(this.accountDetails);
  }

  getAccountLookupFormStatus(status: boolean) {
    this.accountLookupFormStatus = status;
    console.log(this.accountLookupFormStatus);
  }

  displayForm() {
    this.showBusinessForm = true;
  }

  generateOTP() {
    this.loader.start();
    const OTPpayload = {
      process: "MerchantUpdate",
      userId: this.storageService.getLoggedInUser().userDetails.id,
    };
    this.merchantService
      .generateOTPCode(OTPpayload)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.oTPResponse = res;
          this.showOTPModal = true;
          this.loader.end();
          this.ref.markForCheck();
        },
        () => {
          this.loader.end();
          this.ref.markForCheck();
        }
      );
  }

  validateBusinessInfoChange() {
    this.loader.start();

    const { otp } = this.OTPValidateForm.form.value;

    const { accountName, accountNumber, bankName } = this.accountDetails;

    const formValue = {
      accountName,
      accountNumber,
      address: this.merchant.address,
      bankCode: bankName,
      bankVerificationNumber: this.merchant.bankVerificationNumber,
      cacNumber: this.merchant.cacNumber,
      contactEmail: this.merchant.contactEmail,
      contactPhoneNumber: this.merchant.contactPhoneNumber,
      name: this.merchant.name,
      otpCode: otp,
      active: this.merchant.active,
      code: this.merchant.code,
      countryCode: "+234",
      currency: this.merchant.currency,
      id: this.merchant.id,
      lastPaymentDate: this.merchant.lastPaymentDate,
      logoUrl: this.merchant.logoUrl,
      natureOfBusiness: this.merchant.natureOfBusiness,
      otpId: this.oTPResponse.id,
      subscriptionPlan: this.merchant.subscriptionPlan,
      subscriptionStatus: this.merchant.subscriptionStatus,
      taxIdentificationNumber: this.merchant.taxIdentificationNumber,
    };

    this.merchantService
      .updateSingleMerchant(this.merchantId, formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.loader.end();
          this.showOTPModal = false;
          this.ref.markForCheck();
        },
        () => {
          this.loader.end();
          this.ref.markForCheck();
        }
      );
  }
}
