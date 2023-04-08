import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { StorageService } from "@ga/core";
import { DynamicFormComponent } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { LoaderComponent } from "@ga/utility";
import { Observable, Subscription } from "rxjs";
import { OTPPayload } from "src/app/pages/admin/merchants";
import { MerchantsService } from "src/app/pages/admin/merchants/services/merchants.service";
import { Staff } from "../../../my-staffs";
import { StaffsService } from "../../../my-staffs/services/staff.service";
import {
  editProfileForm,
  enterOTPModalData,
  otpFormFields,
  errors,
} from "./admin-constants";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  @ViewChild("profileForm", { static: false })
  updateProfileForm: DynamicFormComponent;
  @ViewChild("OTPForm", { static: false })
  OTPValidateForm: DynamicFormComponent;

  showProfileForm = false;
  profileFormData = editProfileForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];

  userId: number;
  userData$: Observable<Staff>;
  userData: Staff;

  modalData = enterOTPModalData;
  optFormField = otpFormFields;
  merchantId: number;
  oTPResponse: OTPPayload;
  showOTPModal: boolean;

  constructor(
    private ref: ChangeDetectorRef,
    private staffsService: StaffsService,
    private storageService: StorageService,
    private merchantService: MerchantsService
  ) {}

  ngOnInit(): void {
    this.merchantId = this.storageService.getLoggedInUser().userDetails.id;
    this.getStaffDetails();
  }

  getStaffDetails() {
    this.loader.start();
    this.userId = this.storageService.getLoggedInUser().userDetails.id;
    this.userData$ = this.staffsService.fetchSingleStaff(this.userId);
    this.userData$.subscribe(
      (user) => {
        this.userData = user;
        this.profileFormData[0].defaultValue = user.firstName;
        this.profileFormData[1].defaultValue = user.lastName;
        this.profileFormData[2].defaultValue = user.phoneNumber;
        this.profileFormData[3].defaultValue = user.email;
        this.loader.end();
      },
      () => this.loader.end()
    );
  }

  displayForm() {
    this.showProfileForm = true;
  }

  generateOTP() {
    this.loader.start();
    const OTPpayload = {
      process: "MerchantUpdate",
      userId: this.merchantId,
    };
    this.merchantService.generateOTPCode(OTPpayload).subscribe(
      (res) => {
        this.oTPResponse = res;
        this.showOTPModal = true;
        this.loader.end();
        this.ref.markForCheck();
      },
      () => this.loader.end()
    );
  }

  updateProfile() {
    this.loader.start();
    const { otp } = this.OTPValidateForm.form.value;
    const { firstName, lastName } = this.updateProfileForm.form.value;

    console.log(this.updateProfileForm.form.value);
    // const mobile = phoneNumber.substring(4);
    const createForm = {
      id: this.userId,
      userRole: this.userData.userRole,
      firstName: firstName,
      lastName: lastName,
      countryCode: "+234",
      email: this.userData.email,
      phoneNumber: this.userData.phoneNumber.substring(4),
      active: this.userData.active,
      otpCode: otp,
      otpId: this.oTPResponse.id,
    };

    this.staffsService
      .updateSingleStaff(this.userData.id, createForm)
      .subscribe({
        next: (res) => {
          this.showOTPModal = false;
          this.getStaffDetails();
          const userData = this.storageService.getLoggedInUser();
          userData.userDetails.firstName = firstName;
          userData.userDetails.lastName = lastName;
          this.storageService.storeLoggedInUser(userData);
          this.ref.markForCheck();
        },
        error: () => this.loader.end(),
      });
  }
}
