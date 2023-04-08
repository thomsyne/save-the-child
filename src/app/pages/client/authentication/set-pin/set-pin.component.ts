import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@ga/core";
import { ButtonState } from "@ga/dynamic-table";
import { AlertService, LoaderComponent } from "@ga/utility";
import { Subscription } from "rxjs";
import { DynamicFormComponent } from "src/app/shared/dynamic-form/dynamic-form/dynamic-form.component";
import { errors, setPinDetailsForm } from "./set-pin.constants";
@Component({
  selector: "app-set-pin",
  templateUrl: "./set-pin.component.html",
  styleUrls: ["./set-pin.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPinComponent implements OnInit, OnDestroy {
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  @ViewChild("setPinForm", { static: true }) setPinForm: DynamicFormComponent;

  buttonDisabled: ButtonState = "INVALID";

  setPinDetailsForm = setPinDetailsForm;
  errors = errors;

  subscriptions: Subscription[] = [];
  merchantCode: string;
  username: string;
  name: string;
  token: string;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // TODO: Add logic to get the verification code from the route
    const params = this.route.snapshot.params;
    this.merchantCode = params["merchantCode"];
    this.username = params["username"];
    this.name = params["name"];
    this.token = params["token"];
    this.setPinDetailsForm.find(field => field.name === 'verificationCode').defaultValue = this.token;

  }

  completeUserReg() {
    const { verificationCode, newPin, confirmPin } = this.setPinForm.formValues;
    if (newPin !== confirmPin) {
      this.alertService.info("Pins are not the same");
      return;
    }
    this.loader.start();

    const completeUserRegDetails = {
      username: this.username,
      merchant: this.merchantCode,
      activationToken: verificationCode,
      newPassword: newPin,
    };

    this.subscriptions.push(
      // FIXME: Call complete registration service instead of recover pin
      this.authService.completeUserReg(completeUserRegDetails).subscribe(
        (response) => {
          this.alertService.success("Password reset successfully");
          this.loader.end();
          this.router.navigate(["../login"]);
        },
        (error) => {
          this.loader.end();
          this.alertService.error(error);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
