import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  CurrentSubscriptionPlan,
  OnboardMerchant,
  StorageService,
} from "@ga/core";
import { LoaderComponent } from "@ga/utility";
import { OnboardingService } from "src/app/core/services/onboarding.service";
import { UploadService } from "src/app/core/services/upload.service";
import { EntityService } from "src/app/pages/admin/entities/services/entity.service";

enum OnboardingStage {
  SUBSCRIPTION_OPTIONS, // 0
  PLAN_OPTIONS, // 1
  BUSINESS_INFORMATION, // 2
  ADMIN_INFORMATION, // 3
}

@Component({
  selector: "app-onboarding-container",
  templateUrl: "./onboarding-container.component.html",
  styleUrls: ["./onboarding-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingContainerComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  merchant: OnboardMerchant = {
    stage: "",
    code: "",
    name: "",
    address: "",
    contactEmail: "",
    countryCode: "",
    contactPhoneNumber: "",
    currency: "",
    cacNumber: "",
    subscriptionPlan: "",
    subscriptionType: "",
    natureOfBusiness: "",
    taxIdentificationNumber: "",
    bank: {
      bankCode: "",
      accountNumber: "",
      name: "",
    },
    admin: {
      firstname: "",
      lastname: "",
      countryCode: "",
      phone: "",
      email: "",
      bank: {
        bankVerificationNumber: "",
      },
    },
    devices: {
      paymentCycle: 0,
      count: 0,
    },

    identityType: "",
    photoLink : "",
    identityLink : "",
    utilityLink : "",
    businessRegLink : "",
    residentPermitLink : "",
  };

  subscriptionPlans: {
    devicePrice: number;
    outright: CurrentSubscriptionPlan[];
    lease: CurrentSubscriptionPlan[];
    mobile: CurrentSubscriptionPlan[];
  };

  cEntityCode: string;

  saveBusInfoLoading = false;
  saveAdminInfoLoading = false;

  hasFetchPlanCatalogs: boolean;
  selectedSubPlan: CurrentSubscriptionPlan | CurrentSubscriptionPlan[];

  stage: OnboardingStage = OnboardingStage.SUBSCRIPTION_OPTIONS;

  showTermsOfUseModal = false;
  entityData: any
  imageData: any;

  isNigeriaOnboarding: boolean = true;

  constructor(
    private onboardService: OnboardingService,
    private storageService: StorageService,
    private cEntityService: EntityService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCatlog();

    // C.ENTITY INSTRUCTION
    this.cEntityCode = this.route.snapshot.queryParams["ce"];
    console.log(this.cEntityCode);
    if (this.cEntityCode) this.getEntityDetail();

    if (this.storageService.getOnboardUserCode()) {

      this.merchant.code = this.storageService.getOnboardUserCode();
      this.stage = OnboardingStage.BUSINESS_INFORMATION;
    }
  }

  getCatlog() {
    this.loader.start();
    this.onboardService.getOnboardingCatlog().subscribe(
      (res) => {
        this.subscriptionPlans = res["subscriptions"];
        this.subscriptionPlans.devicePrice = res["devicePrice"];
        this.hasFetchPlanCatalogs = true;
        this.getSelectedPlanFromQueryparam();
        this.loader.end();
        this.ref.markForCheck();
      },
      () => {
        this.hasFetchPlanCatalogs = false;
        this.loader.end();
      }
    );
  }

  getEntityDetail(){
    this.cEntityService.fetchSingleEntity(this.cEntityCode).subscribe((res) => {

      this.storageService.storeCurrentEntity(res.data)

      this.entityData = res.data;

      this.isNigeriaOnboarding = this.entityData.countryCode?.includes('234') ? true : false

      if (!this.entityData.isActive) return;

        this.ref.detectChanges()
        if (!this.entityData.subscriptionAllow) this.stage = OnboardingStage.BUSINESS_INFORMATION;
        this.ref.detectChanges()

        this.setImage()

        //  Set request properties
        this.merchant.isBankMerchant = true;
        this.merchant.entityCode = this.cEntityCode;
    });
  }

  setImage(){
    setTimeout(() => {
      document
          .getElementById("onboarding__logo")
          .setAttribute("src", this.entityData.logo);
    }, 100);
  }

  // setImage(res: any){
  //   let blob = new Blob([res], {type: 'image/png'});

  //       var reader = new window.FileReader();
  //       reader.readAsDataURL(blob);
  //       reader.onloadend = function () {
  //           let base64data = reader.result;
  //           setTimeout(() => {
  //             document
  //                 .getElementById("onboarding__logo")
  //                 .setAttribute("src", base64data.toString());
  //           }, 100);
  //       }
  //       this.ref.detectChanges()
  // }

  getSelectedPlanFromQueryparam() {
    const selectedPlan = this.route.snapshot.queryParamMap.get("plan");
    if (
      selectedPlan &&
      (selectedPlan === "lease" ||
        selectedPlan === "mobile" ||
        selectedPlan === "outright")
    ) {
      this.selectSubTypeComplete(selectedPlan);
    }
  }

  selectSubTypeComplete(subType: string) {
    this.merchant.subscriptionType = subType;

    if (subType === "mobile") {
      this.selectedSubPlan = this.subscriptionPlans[subType][0];
    } else {
      this.selectedSubPlan = this.subscriptionPlans[subType];
    }

    this.stage = OnboardingStage.PLAN_OPTIONS;
    this.setImage()
  }

  selectPlanDetailsComplete(planDetails) {
    if (this.merchant.subscriptionType === "outright") {
      this.merchant.devices.count = planDetails.numberOfPOS;
    }

    this.merchant.devices.paymentCycle = planDetails.amountOfMonths;

    this.merchant.subscriptionPlan = planDetails.planName;

    this.stage = OnboardingStage.BUSINESS_INFORMATION;

    this.setImage()
  }

  inputBusInfoComplete(businessInfo) {
    this.loader.start();
    this.merchant.name = businessInfo.businessName;
    this.merchant.address = businessInfo.businessAddress;
    this.merchant.contactEmail = businessInfo.contactEmail;
    this.merchant.countryCode = businessInfo.dialCode;
    this.merchant.contactPhoneNumber = businessInfo.phoneNumber;
    this.merchant.currency = businessInfo.currency;
    this.merchant.cacNumber = businessInfo.cacNumber;
    this.merchant.taxIdentificationNumber =
      businessInfo.taxIdentificationNumber;
    this.merchant.natureOfBusiness = businessInfo.natureOfBusiness;

    this.merchant.bank.bankCode = businessInfo.bankCode;
    this.merchant.bank.accountNumber = businessInfo.accountNumber;
    this.merchant.bank.name = businessInfo.accountName;

    this.merchant.stage = "MerchantStage";

    if (!this.merchant.countryCode?.includes('234')){
      this.merchant.admin.countryCode = this.merchant.countryCode
      this.merchant.admin.email = this.merchant.contactEmail
      this.merchant.admin.phone = this.merchant.contactPhoneNumber
      this.merchant.admin.firstname = this.merchant.name.split(' ')[0]
      this.merchant.admin.lastname = this.merchant.name.split(' ')[1] || ''

      this.merchant.identityType = businessInfo.identityType
      this.merchant.photoLink = businessInfo.photoLink
      this.merchant.identityLink = businessInfo.identityLink
      this.merchant.utilityLink = businessInfo.utilityLink
      this.merchant.businessRegLink = businessInfo.businessRegLink
      this.merchant.residentPermitLink = businessInfo.residentPermitLink
    }

    this.saveBusInfoLoading = true;
    this.onboardService.onboardMerchant(this.merchant).subscribe(
      (res) => {
        this.merchant.code = res["code"];
        this.showTermsOfUseModal = true;
        this.saveBusInfoLoading = false;
        this.loader.end();
        this.ref.markForCheck();
      },
      () => {
        this.saveBusInfoLoading = false;
        this.loader.end();
        this.ref.markForCheck();
      }
    );
  }

  closeModal(status) {
    this.showTermsOfUseModal = false;
    if (status.accepted && this.merchant.countryCode?.includes('234')) {
      this.storageService.storeOnboardUserCode(this.merchant.code);
      this.stage = OnboardingStage.ADMIN_INFORMATION;
    } else {
      this.routeToSuccess()
    }
  }

  inputAdminInfoComplete(adminInfo) {
    this.loader.start();
    this.merchant.admin.firstname = adminInfo.firstName;
    this.merchant.admin.lastname = adminInfo.lastName;
    this.merchant.admin.countryCode = adminInfo.countryCode;
    this.merchant.admin.phone = adminInfo.phoneNumber;
    this.merchant.admin.email = adminInfo.emailAddress;
    this.merchant.admin.countryCode = adminInfo.countryCode;

    this.merchant.admin.bank.bankVerificationNumber = adminInfo.bvn;
    this.merchant.stage = "AdminStage";

    this.saveAdminInfoLoading = true;

    this.onboardService.onboardMerchant(this.merchant).subscribe(
      (res) => {
        this.saveAdminInfoLoading = false;
        this.storageService.rmvOnboardUserCode();
        this.loader.end();

        this.routeToSuccess()
      },
      (err) => {
        this.saveAdminInfoLoading = false;
        this.loader.end();
      }
    );
  }

  routeToSuccess(){
    this.router.navigate(["registration-success"], {
      queryParams: {
        plan: this.merchant.subscriptionType,
        ce: this.merchant.entityCode
      },
    });
  }
}
