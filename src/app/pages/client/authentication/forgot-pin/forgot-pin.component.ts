import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewChecked,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { AuthService } from "@ga/core";
import { DynamicFormComponent } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { LoaderComponent, AlertService } from "@ga/utility";
import { Subscription } from "rxjs";
import { errors } from "src/app/pages/shared/my-staffs/components/create-role/create-role.constants";
import { loginClientDetailsForm } from "./forgot-pin.constants";

@Component({
  selector: "app-forgot-pin",
  templateUrl: "./forgot-pin.component.html",
  styleUrls: ["./forgot-pin.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPinComponent implements AfterViewInit, OnDestroy {
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  @ViewChild("loginForm", { static: false }) resetForm: DynamicFormComponent;

  buttonDisabled: ButtonState = "INVALID";
  permissions: string[];
  loginDetailsForm = loginClientDetailsForm;
  errors = errors;

  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.resetForm.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  sendOTP() {
    let { phoneNumber, merchantCode } = this.resetForm.form.value;

    if (phoneNumber.length === 11) {
      phoneNumber = phoneNumber.replace("0", "+234");
    } else {
      phoneNumber = `+234${phoneNumber}`;
    }

    this.loader.start();

    const otpDetails = {
      username: phoneNumber,
      merchant: merchantCode,
    };

    this.subscriptions.push(
      this.authService.sendOTP(otpDetails).subscribe({
        next: () => {
          this.loader.end();
          this.alertService.success("Token sent successfully");
          this.resetForm.form.patchValue({
            phoneNumber: "",
            merchantCode: "",
          });
        },
        error: () => {
          this.loader.end();
          this.ref.markForCheck();
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
