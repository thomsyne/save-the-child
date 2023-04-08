import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@ga/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { AlertService, LoaderComponent } from '@ga/utility';
import { Subscription } from 'rxjs';
import { recoverPinFormDetails, errors } from './recover-pin.constants';

@Component({
  selector: 'app-recover-pin',
  templateUrl: './recover-pin.component.html',
  styleUrls: ['./recover-pin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoverPinComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  @ViewChild("recoverPinForm", { static: true }) recoverPinForm: DynamicFormComponent;

  buttonDisabled: ButtonState = "INVALID";

  recoverPinDetailsForm = recoverPinFormDetails;
  errors = errors;

  subscriptions: Subscription[] = [];
  merchantCode: string;
  username: string;
  name: string;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // TODO: Add logic to get the verification code from the route
    const params = this.route.snapshot.params;
    console.log(params);
    this.merchantCode = params["merchantCode"];
    this.username = params["username"];
    this.name = params["name"];
  }

  completeUserPinChange() {
    const { token, newPin, confirmPin } = this.recoverPinForm.form.value;
    if (newPin !== confirmPin) {
      this.alertService.error("Pins are not the same");
      return;
    }

    const payload = {
      merchant: this.merchantCode,
      newPassword: newPin,
      token: token,
      username: this.username
    };

    this.authService.recoverPin(payload).subscribe({
      next: (response) => {
        this.alertService.success("Pin changed successfully");
        this.router.navigate(["/login"]);
      }
    })
  }

}
