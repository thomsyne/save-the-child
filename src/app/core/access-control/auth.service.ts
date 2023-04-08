import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.dev";
import { StorageService } from "..";
import { Config } from "../constants/endpoints";
import { LoggedInUserObject, LoginClientCredentials } from "../model";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private config: Config,
    private storageService: StorageService,
    private router: Router
  ) {}

  gaAdminLogin(email: string): Observable<LoggedInUserObject> {
    return this.httpClient.post<LoggedInUserObject>(
      `${BASE_URL}${this.config.gaAdminLogin}`,
      { username: email }
    );
  }

  storeAdminLogin(
    userDetails: LoginClientCredentials
  ): Observable<LoggedInUserObject> {
    return this.httpClient.post<LoggedInUserObject>(
      BASE_URL + this.config.storeAdminLogin,
      userDetails
    );
  }

  completeUserReg(resetPinDetails: {
    username: string;
    merchant: string;
    activationToken: string;
    newPassword: string;
  }) {
    return this.httpClient.post(
      BASE_URL + this.config.completeUserReg,
      resetPinDetails
    );
  }

  recoverPin(recoverPinDetails: object) {
    return this.httpClient
      .post(BASE_URL + this.config.recoverPin, recoverPinDetails);
  }

  logout() {
    if (this.storageService.isGaAdmin()) {
      this.router.navigate(["../../admin-login"]);
    } else {
      this.router.navigate([""]);
    }
    this.storageService.clearStorage();
  }

  sendOTP(sendOTPDetails: object) {
    return this.httpClient
      .post(BASE_URL + this.config.sendOTP, sendOTPDetails);
  }
}
