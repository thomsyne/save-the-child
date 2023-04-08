import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoggedInUserObject, StorageService } from "@ga/core";
import { DynamicFormComponent, Field } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { ModalMetaData } from "@ga/modal";
import { AlertService } from "@ga/utility";
import { Observable, Subscription } from "rxjs";
import { SubscriptionsService } from "../../../subscriptions/services/subscriptions.service";
import { Merchant } from "../../model";
import { MerchantsService } from "../../services/merchants.service";
import {
  updateMerchantForm,
  updateMerchantSubForm,
  errors,
  changeMerchantStatusModalData,
} from "./merchant-profile.constants";

@Component({
  selector: "app-merchant-profile",
  templateUrl: "./merchant-profile.component.html",
  styleUrls: ["./merchant-profile.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantProfileComponent implements OnInit {
  @ViewChild("mainMerchantForm", { static: false })
  mainMerchantForm: DynamicFormComponent;
  @ViewChild("subscriptionMerchantSubForm", { static: false })
  subscriptionMerchantSubForm: DynamicFormComponent;

  merchantForm;
  merchantSubForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  subscriptionsPlans;
  displayForm: boolean;
  id: number;
  merchant$: Observable<Merchant>;
  merchant: Merchant;

  loggedInUser: LoggedInUserObject;

  showStatusChangeModal: boolean;
  merchantStatusModalData: ModalMetaData;
  pinResetLoading: boolean;

  didUploadDocument: boolean = false;

  documentsArray: any[] = [
    { name: 'Uploaded Photo', param: 'photoLink', value: '' },
    { name: 'ID Upload', param: 'identityLink', value: '' },
    { name: 'Utility Bill', param: 'utilityLink', value: '' },
    { name: 'Business Registration Doc.', param: 'businessRegLink', value: '' },
    { name: 'Resident Permit', param: 'residentPermitLink', value: '' },

  ]

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantsService,
    private storageService: StorageService,
    private alertService: AlertService,
    private subscriptionsService: SubscriptionsService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.parent.params["id"];
    this.loggedInUser = this.storageService.getLoggedInUser();
    this.getAllSubscriptions();
  }

  getAllSubscriptions() {
    this.subscriptionsService.fetchAllSubscriptions().subscribe((res) => {
      let store = [];
      res.forEach((susbcription) => {
        store.push([susbcription.name, `${susbcription.name}`]);
      });
      this.subscriptionsPlans = new Map(store);
      updateMerchantSubForm[0].options = this.subscriptionsPlans;
      this.getMerchantDetails();
    });
  }

  getMerchantDetails() {
    this.merchant$ = this.merchantService.fetchSingleMerchant(this.id);
    this.merchant$.subscribe((res) => {
      this.displayForm = true;
      this.merchant = res;

      this.didUploadDocument = this.merchant.identityLink
                            || this.merchant.photoLink
                            || this.merchant.utilityLink
                            || this.merchant.businessRegLink
                            || this.merchant.residentPermitLink ? true : false

      this.documentsArray.map((x) => {
        x.value = this.merchant[x.param]
      })

      updateMerchantForm[0].defaultValue = res.name;
      updateMerchantForm[1].defaultValue = res.address;
      updateMerchantForm[2].defaultValue = res.contactEmail;
      updateMerchantForm[3].defaultValue = res.cacNumber;
      updateMerchantForm[4].defaultValue = res.contactPhoneNumber;
      updateMerchantForm[5].defaultValue = res.natureOfBusiness;
      updateMerchantForm[6].defaultValue = res.bankCode;
      updateMerchantForm[7].defaultValue = res.accountName;
      updateMerchantForm[8].defaultValue = res.taxIdentificationNumber;
      updateMerchantForm[9].defaultValue = res.currency;
      updateMerchantForm[10].defaultValue = res.accountNumber;
      updateMerchantForm[11].defaultValue = res.bankVerificationNumber;
      updateMerchantForm[12].defaultValue = res.subscriptionStatus;
      updateMerchantForm[13].defaultValue = res.active;

      updateMerchantForm[14].defaultValue = res.startDate
        ? res.startDate.split("T")[0]
        : "";
      updateMerchantForm[15].defaultValue = res.nextPaymentDate
        ? res.nextPaymentDate.split("T")[0]
        : "";
      updateMerchantForm[16].defaultValue = res.lastPaymentDate
        ? res.lastPaymentDate.split("T")[0]
        : "";

      updateMerchantForm[17].defaultValue = res.cycleLength;
      updateMerchantForm[18].defaultValue = res.totalCycles;

      updateMerchantForm[14].visible =
        this.loggedInUser.userDetails.permissions.includes(
          "CAN_UPDATE_SPECIAL_USER_INFO"
        );
      updateMerchantForm[15].visible =
        this.loggedInUser.userDetails.permissions.includes(
          "CAN_UPDATE_SPECIAL_USER_INFO"
        );
      updateMerchantForm[16].visible =
        this.loggedInUser.userDetails.permissions.includes(
          "CAN_UPDATE_SPECIAL_USER_INFO"
        );
      updateMerchantForm[17].visible =
        this.loggedInUser.userDetails.permissions.includes(
          "CAN_UPDATE_SPECIAL_USER_INFO"
        );
      updateMerchantForm[18].visible =
        this.loggedInUser.userDetails.permissions.includes(
          "CAN_UPDATE_SPECIAL_USER_INFO"
        );

      updateMerchantSubForm[0].defaultValue = res.subscriptionPlan;
      this.handleMerchantActiveStatus(res.active);
      this.merchantForm = updateMerchantForm;
      this.merchantSubForm = updateMerchantSubForm;
      this.ref.markForCheck();
    });
  }

  handleMerchantActiveStatus(isActive: boolean) {
    this.merchantStatusModalData = changeMerchantStatusModalData;
    if (isActive) {
      this.merchantStatusModalData.header = "Suspend Merchant";
      this.merchantStatusModalData.buttonText = "Suspend Merchant";
    } else {
      this.merchantStatusModalData.header = "Activate Merchant";
      this.merchantStatusModalData.buttonText = "Activate Merchant";
    }
  }

  updateSubPlan() {
    const { subscriptionPlan } = this.subscriptionMerchantSubForm.form.value;

    this.merchantService
      .updateMerchantSubPlan(this.merchant.id, subscriptionPlan)
      .subscribe({
        next: () => {
          this.alertService.success("Subscription plan updated successfully");
        },
      });
  }

  updateMerchant() {
    const {
      bankVerificationNumber,
      cacNumber,
      contactEmail,
      contactPhoneNumber,
      bankCode,
      accountName,
      accountNumber,
      code,
      currency,
      id,
      lastPaymentDate,
      logoUrl,
      name,
      natureOfBusiness,
      subscriptionPlan,
      subscriptionStatus,
      taxIdentificationNumber,
    } = this.merchant;

    const formValues = this.mainMerchantForm.form.value;
    const payload: Partial<Merchant> = {
      bankVerificationNumber,
      cacNumber,
      contactEmail,
      contactPhoneNumber,
      bankCode,
      accountName,
      accountNumber,
      code,
      countryCode: "+234",
      currency,
      id,
      lastPaymentDate,
      logoUrl,
      name,
      natureOfBusiness,
      subscriptionPlan,
      subscriptionStatus,
      taxIdentificationNumber,
      ...formValues,
    };

    this.merchantService.updateSingleMerchant(id, payload).subscribe((res) => {
      this.alertService.success("Merchant updated successfully");
      this.getMerchantDetails();
    });
  }

  changeMerchantStatus() {
    const {
      bankVerificationNumber,
      cacNumber,
      contactEmail,
      contactPhoneNumber,
      bankCode,
      accountName,
      accountNumber,
      code,
      currency,
      id,
      lastPaymentDate,
      logoUrl,
      name,
      natureOfBusiness,
      subscriptionPlan,
      subscriptionStatus,
      taxIdentificationNumber,
      address,
    } = this.merchant;

    const payload: Partial<Merchant> = {
      bankVerificationNumber,
      cacNumber,
      contactEmail,
      contactPhoneNumber,
      bankCode,
      accountName,
      accountNumber,
      code,
      countryCode: "+234",
      currency,
      id,
      lastPaymentDate,
      logoUrl,
      name,
      natureOfBusiness,
      subscriptionPlan,
      subscriptionStatus,
      taxIdentificationNumber,
      address,
      active: !this.merchant.active,
    };

    this.merchantService.updateSingleMerchant(id, payload).subscribe((res) => {
      this.alertService.success("Merchant Status updated successfully");
      this.getMerchantDetails();
      this.mainMerchantForm.form.patchValue({
        active: payload.active,
      });
      this.showStatusChangeModal = !this.showStatusChangeModal;
      this.ref.markForCheck();
    });
  }

  resetAnpPinAndPassword() {
    this.pinResetLoading = true;

    this.merchantService.resetAnpPin(this.merchant.id).subscribe(
      (res) => {
        this.merchantService.resetAnpPassword(this.merchant.id).subscribe(
          (res) => {
            this.pinResetLoading = false;
            this.alertService.success("Merchant PIN reset successfully");
          },
          (err) => {
            this.pinResetLoading = false;
          }
        );
      },
      (err) => {
        this.pinResetLoading = false;
      }
    );
  }

  viewDownload(url: string){
    const newTab = window.open();
    newTab?.document.write(
      `<!DOCTYPE html><head><title>Document preview</title></head><body><img src="${url}" width="auto" height="auto" ></body></html>`);
    newTab?.document.close();
  }
}
