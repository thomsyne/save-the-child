import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { DynamicFormComponent } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { AlertService, LoaderComponent } from "@ga/utility";
import { Subscription } from "rxjs";
import { MerchantsService } from "src/app/pages/admin/merchants/services/merchants.service";
import { changePasswordForm, errors } from "./security.constants";

@Component({
  selector: "app-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  @ViewChild("form", { static: false })
  accessForm: DynamicFormComponent;

  securityForm = changePasswordForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  constructor(
    private alertService: AlertService,
    private merchantService: MerchantsService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  changePin() {
    const { currentPin, newPin, confirmPin } = this.accessForm.form.value;

    if (newPin !== confirmPin) {
      this.alertService.error("Confirm password mismatch");
      return;
    }
    this.loader.start();

    const payload = {
      newPassword: newPin,
      oldPassword: currentPin,
    };

    this.merchantService.changeMerchantPin(payload).subscribe({
      next: () => {
        this.alertService.success("Successfully Updated");
        this.accessForm.form.patchValue({
          currentPin: "",
          newPin: "",
          confirmPin: "",
        });
        this.loader.end();
        this.ref.markForCheck();
      },
      error: () => this.loader.end(),
    });
  }
}
