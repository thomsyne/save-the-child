import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewChecked,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent, StorageService } from "@ga/core";
import { DynamicFormComponent, Field, FieldType } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { AlertService, LoaderComponent } from "@ga/utility";
import { Observable, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { OTPPayload } from "src/app/pages/admin/merchants";
import { MerchantsService } from "src/app/pages/admin/merchants/services/merchants.service";
import { ShopsService } from "src/app/pages/client/shops/services/shops.service";
import { Role, Staff, StaffBalance } from "../../model";
import { StaffsService } from "../../services/staff.service";
import {
  updateStaffFormFields,
  errors,
  otpFormFields,
  enterOTPModalData,
} from "./update-staff.constants";

@Component({
  selector: "app-update-staff",
  templateUrl: "./update-staff.component.html",
  styleUrls: ["./update-staff.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateStaffComponent
  extends BaseComponent
  implements OnInit, AfterViewChecked
{
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;

  @ViewChild("updateForm", { static: false })
  updateForm: DynamicFormComponent;

  @ViewChild("OTPForm", { static: false })
  OTPValidateForm: DynamicFormComponent;

  updateStaffForm = updateStaffFormFields;
  roleAccessForm: Field[] = [];
  errors = errors;
  buttonDisabled: ButtonState;

  showOTPModal: boolean;
  optFormField = otpFormFields;
  modalData = enterOTPModalData;
  oTPResponse: OTPPayload;

  id: number;
  selectedStaff: Staff;
  selectedStaffRole: Role;
  // selectedStaffBalance: Observable<StaffBalance>;
  roles: Role[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private staffsService: StaffsService,
    private ref: ChangeDetectorRef,
    private router: Router,
    public storageService: StorageService,
    private merchantService: MerchantsService,
    private alertService: AlertService,
    private shopsService: ShopsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getUserDetails();
    this.fetchAllShops()
  }

  ngAfterViewChecked() {
    this.updateForm.form.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: ButtonState) => (this.buttonDisabled = status));
  }

  fetchAllShops(){
    this.shopsService
      .fetchAllShops(0, 1000, {
        name: '', systemName: ''
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {

        let stores = res.data

        const storeOptions: Map<string, string> = new Map();
        stores.forEach((storeOption) => {
          storeOptions.set(storeOption.name, storeOption.systemName)
        })
        this.updateStaffForm[6].options = storeOptions

      })
  }

  getUserDetails() {
    this.staffsService
      .fetchSingleStaff(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.selectedStaff = res;

        if (res.merchantCode) {
          this.nonSystemAdminDataPrep();
        } else {
          this.systemAdminDataPrep();
        }
      });
  }

  nonSystemAdminDataPrep() {
    this.staffsService
      .fetchRolesInStore(this.selectedStaff.merchantCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((storeRoles) => {
        const role = storeRoles.find(
          (storeRole) => storeRole.name === this.selectedStaff.userRole
        );
        const roleOptions: Map<string, string> = new Map();
        storeRoles.forEach((storeRole) => {
          roleOptions.set(storeRole.name, storeRole.name);
        });
        this.updateStaffForm[5].options = roleOptions;

        if (role) {
          updateStaffFormFields[4].visible = role.permissions.includes(
            "CAN_UPDATE_SPECIAL_USER_INFO"
          );

          this.roleAccessForm = role.permissions.map((permission) => {
            return {
              name: permission,
              displayValue: permission.replace(/_/g, " "),
              type: FieldType.CHECKBOX,
              defaultValue: true,
              disabled: true,
            };
          });
        }

        this.updateForm.form.patchValue({
          firstName: this.selectedStaff.firstName,
          lastName: this.selectedStaff.lastName,
          phoneNumber: this.selectedStaff.phoneNumber,
          email: this.selectedStaff.email,
          userRole: this.selectedStaff.userRole,
          merchantCode: this.selectedStaff.merchantCode,
          active: this.selectedStaff.active,
          currentStore: this.selectedStaff.currentStore
        });
        this.ref.markForCheck();
      });
  }

  systemAdminDataPrep() {
    this.staffsService
      .fetchRolesWithoutTableData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.roles = res;
          const roleOptions: Map<string, string> = new Map();
          this.roles.forEach((role) => {
            roleOptions.set(role.name, role.name);
          });
          this.updateStaffForm[5].options = roleOptions;

          this.updateForm.form.patchValue({
            firstName: this.selectedStaff.firstName,
            lastName: this.selectedStaff.lastName,
            phoneNumber: this.selectedStaff.phoneNumber,
            email: this.selectedStaff.email,
            userRole: this.selectedStaff.userRole,
            active: this.selectedStaff.active,
          });
          this.ref.markForCheck();
        },
      });
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
      .subscribe({
        next: (res) => {
          this.oTPResponse = res;
          this.showOTPModal = true;
          this.loader.end();
          this.ref.markForCheck();
        },
        error: (err) => this.loader.end(),
      });
  }

  updateStaff() {
    const { otp } = this.OTPValidateForm.form.value;
    const merchantCode =
      this.storageService.getLoggedInUser().userDetails.merchant.code;
    const roleValues = this.updateForm.form.value;
    roleValues["countryCode"] = "+234";
    roleValues["id"] = this.id;
    // roleValues["merchantCode"] = merchantCode;
    roleValues["otpId"] = this.oTPResponse.id;
    roleValues["otpCode"] = otp;

    this.staffsService
      .updateSingleStaff(this.id, roleValues)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.showOTPModal = !this.showOTPModal;
          this.alertService.success("Staff updated successfully");
          this.router.navigateByUrl("/staff/manage");
        },
      });
  }

  resendToken() {
    this.loader.start();

    const form = {
      merchantCode: this.selectedStaff.merchantCode,
      username: this.selectedStaff.phoneNumber,
    };

    this.staffsService
      .resendToken(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loader.end();
          this.alertService.success("Token Sent Successfully");
          this.ref.markForCheck();
        },
        error: () => {
          this.loader.end();
          this.ref.markForCheck();
        },
      });
  }
}
