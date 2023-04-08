import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewChecked,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  AuthService,
  LoggedInUserObject,
  LoginClientCredentials,
  StorageService,
} from "@ga/core";
import { ButtonState } from "@ga/dynamic-table";
import { AlertService, LoaderComponent } from "@ga/utility";
import { Subscription } from "rxjs";
import { DynamicFormComponent } from "src/app/shared/dynamic-form/dynamic-form/dynamic-form.component";
import { loginClientDetailsForm, errors } from "./login.costants";

export class StoreAdminLogin {
  username: string;
  password: string;
  merchant: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements AfterViewChecked, OnDestroy {
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  @ViewChild("loginForm", { static: false }) loginForm: DynamicFormComponent;

  buttonDisabled: ButtonState = "INVALID";
  permissions: string[];
  loginDetailsForm = loginClientDetailsForm;
  errors = errors;

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private storageService: StorageService,
    private ref: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    this.subscriptions.push(
      this.loginForm.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  parseNumber(phoneNumber): string{
    //Ghana
    console.log(phoneNumber)
    if (phoneNumber.includes("233")){

    }

    else if (phoneNumber.length === 11) {
      phoneNumber = phoneNumber.replace("0", "+234");
    } else {
      phoneNumber = `+234${phoneNumber}`;
    }
    return phoneNumber
  }

  logIn(){
    this.loader.start()
    let { email, password } = this.loginForm.formValues;

    setTimeout(() => {

      if (email == 'charles@gmail.com' && password == '1234'){

         const loginCredentials: LoginClientCredentials = {
           username: '+2347065526766',
           merchant: 'QM-7044',
           password: '1234',
         };

        this.authService.storeAdminLogin(loginCredentials).subscribe(
          (response) => {
            this.storageService.storeLoggedInUser(response);
            this.loader.end();
            this.alertService.success("Login Successful");
            this.router.navigate(["dashboard"]);
          })

          //this.alertService.success("Login Successful");
          //this.router.navigate(["dashboard"]);
        
      } else {
        this.alertService.error('Incorrect Credentials!')
      }

    }, 2000);
  }

  // logIn() {
  //   this.loader.start();
  //   let { phoneNumber, merchantCode, pin } = this.loginForm.formValues;

  //   phoneNumber = this.parseNumber(phoneNumber)

  //   const loginCredentials: LoginClientCredentials = {
  //     username: phoneNumber,
  //     merchant: merchantCode,
  //     password: pin,
  //   };

  //   this.authService.storeAdminLogin(loginCredentials).subscribe(
  //     (response) => {
  //       this.storageService.storeLoggedInUser(response);
  //       this.loader.end();

  //       if (response.invoiceViewModel && this.storageService.isMerchantAdmin() ) {
  //         console.log('here1')
  //         this.router.navigateByUrl("payment");
  //         return;
  //       }

  //       if (!response.userDetails.lastLogin && this.storageService.isMerchantAdmin() && !response.userDetails.merchant.entityCode) {
  //         console.log('here2')
  //         this.router.navigateByUrl("payment");
  //         return;
  //       }
  //       this.alertService.success("Login Successful");

  //       this.permissions = this.storageService.getPermissons();
  //       // Redirect based on permission
  //       if (this.permissions.includes("CAN_VIEW_MERCHANT_DASHBOARD")) {
  //         this.router.navigate(["dashboard"]); // Merchant Dashboard
  //       } else if (this.permissions.includes("CAN_SEARCH_DISPUTE")) {
  //         this.router.navigate(["support"]); // Support
  //       } else if (this.permissions.includes("CAN_VIEW_CUSTOMER")) {
  //         this.router.navigate(["customers"]); // Customers
  //       } else if (this.permissions.includes("CAN_VIEW_DEVICE")) {
  //         this.router.navigate(["devices"]); // Devices
  //       } else if (
  //         this.permissions.includes("CAN_VIEW_PRODUCT") ||
  //         this.permissions.includes("CAN_VIEW_CATEGORY") ||
  //         this.permissions.includes("CAN_VIEW_INVENTORY") ||
  //         this.permissions.includes("CAN_CREATE_PRODUCT")
  //       ) {
  //         this.router.navigate(["products"]); // Products
  //       } else if (
  //         this.permissions.includes("CAN_VIEW_MERCHANT_BILL") ||
  //         this.permissions.includes("CAN_VIEW_ORDER")
  //       ) {
  //         this.router.navigate(["reports"]); // Reports
  //       } else if (this.permissions.includes("CAN_VIEW_STORES")) {
  //         this.router.navigate(["store"]); // Shops
  //       } else if (
  //         this.permissions.includes("CAN_SEARCH_USER") ||
  //         this.permissions.includes("CAN_VIEW_ROLES") ||
  //         this.permissions.includes("CAN_VIEW_ORDER")
  //       ) {
  //         this.router.navigate(["user"]); // Users
  //       } else {
  //         this.alertService.info(
  //           "Insufficient Permissions Contact Administrator"
  //         );
  //       }
  //     },
  //     (error) => {
  //       this.loader.end();
  //       this.ref.markForCheck();
  //     }
  //   );
  // }

  handleFirstTimeUserLogin(loggedInUser: LoggedInUserObject) {
    const lastLogin = loggedInUser.userDetails.lastLogin;
    const isAdmin = this.storageService.isGaAdmin();

    if (isAdmin) return;

    if (!lastLogin) {
      console.log('here3')
      this.router.navigateByUrl("payment");
    }

    if (loggedInUser.invoiceViewModel) {
      console.log('here4')
      this.router.navigateByUrl("payment");
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
