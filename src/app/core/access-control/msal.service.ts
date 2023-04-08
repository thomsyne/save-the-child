import { Config } from "src/app/core/constants/endpoints";
import { Injectable } from "@angular/core";
import { UserAgentApplication } from "msal";
import { Router } from "@angular/router";
import { AlertService } from "@ga/utility";
import { BehaviorSubject } from "rxjs";
import { MsalGraphResponse } from "../model";
import { StorageService, TokenService } from "..";
import { AuthService } from "./auth.service";
import { mergeMap } from "rxjs/operators";
import { environment } from "src/environments/environment.dev";

@Injectable({
  providedIn: "root",
})
export class MsalService {
  userAgentApplication: any;
  userData: any;
  allowedServices: any;

  // For Loading status
  private loadingSource = new BehaviorSubject<boolean>(false);
  loadingStatus$ = this.loadingSource.asObservable();

  constructor(
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.userAgentApplication = new UserAgentApplication(
      environment.MSAL_TOKEN,
      null,
      this.tokenReceivedCallback
    );
  }

  updateLoadingStatus(val: boolean) {
    this.loadingSource.next(val);
  }

  protected tokenReceivedCallback(errorDesc, token, error, tokenType) {
    if (token) {
      this.userData = token;
    }
  }

  microsoftSignIn() {
    const graphScopes = ["user.read"];
    const that = this;

    that.updateLoadingStatus(true);

    that.userAgentApplication.loginPopup(graphScopes).then(
      (idToken) => {
        // Login Success
        that.userAgentApplication.acquireTokenSilent(graphScopes).then(
          function (accessToken) {
            // AcquireTokenSilent Success
            const headers = new Headers();
            const bearer = "Bearer " + accessToken;
            headers.append("Authorization", bearer);
            const options = {
              method: "GET",
              headers: headers,
            };
            const graphEndpoint = "https://graph.microsoft.com/v1.0/me";
            fetch(graphEndpoint, options).then(function (response) {
              response.json().then(function (data: MsalGraphResponse) {
                // Dynamic content ;
                if (data) {
                  that.tokenService
                    .getXToken()
                    .pipe(
                      mergeMap(() =>
                        that.authService.gaAdminLogin(data.userPrincipalName)
                      )
                    )
                    .subscribe(
                      (res) => {
                        that.storageService.storeLoggedInUser(res);

                        that.computePermission();

                        that.updateLoadingStatus(false);
                      },
                      (err) => {
                        that.updateLoadingStatus(false);
                        that.alertService.error(err);
                      }
                    );
                }
              });
            });
          },
          function (error) {
            // AcquireTokenSilent Failure, send an interactive request.
            that.userAgentApplication.acquireTokenPopup(graphScopes).then(
              function (accessToken: any) {
                // updateUI();
              },
              () => {
                that.alertService.error(error, true);
                console.log(error);
                that.updateLoadingStatus(false);
              }
            );
          }
        );
      },
      (error) => {
        // Login failure
        that.alertService.error(error, true);
        console.log(error);
        that.updateLoadingStatus(false);
      }
    );
  }

  computePermission() {
    const permissions = this.storageService.getPermissons();

    // Redirect bases on permission
    if (
      permissions.includes("CAN_VIEW_ADMIN_REPORT") ||
      permissions.includes("CAN_SEARCH_MERCHANT")
    ) {
      this.router.navigate(["admin-dashboard"]);
    } else if (permissions.includes("CAN_SEARCH_ALL_DISPUTES")) {
      this.router.navigate(["support"]);
    } else if (permissions.includes("CAN_SEARCH_MERCHANT")) {
      this.router.navigate(["merchant"]);
    } else if (permissions.includes("CAN_SEARCH_SUBSCRIPTION")) {
      this.router.navigate(["subscription"]);
    } else if (permissions.includes("CAN_VIEW_ALL_DEVICES")) {
      this.router.navigate(["devices"]);
    } else if (
      permissions.includes("CAN_VIEW_ALL_ORDERS") ||
      permissions.includes("CAN_VIEW_ALL_SETTLEMENT") ||
      permissions.includes("CAN_VIEW_ALL_MERCHANTS_BILL")
    ) {
      this.router.navigate(["admin-reports"]);
    } else if (
      permissions.includes("CAN_SEARCH_ALL_USER") ||
      permissions.includes("CAN_VIEW_ROLES")
    ) {
      this.router.navigate(["admin-users"]);
    } else {
      this.alertService.info("Insufficient Permissions Contact Administrator");
    }
  }
}
