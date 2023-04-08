import { EntityList } from './../model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoggedInUserObject, XTokenResponse } from "..";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private userData = new BehaviorSubject<LoggedInUserObject>(null);
  userData$ = this.userData.asObservable();

  constructor() {
    if (this.getLoggedInUser()) {
      this.updateUserData();
    }
  }

  updateUserData() {
    if (this.getLoggedInUser() !== null)
      this.userData.next(this.getLoggedInUser());
  }

  isGaAdmin() {
    return !this.getLoggedInUser().userDetails.merchant;
  }

  isMerchantAdmin(){
    return this.getLoggedInUser().userDetails.merchant && this.getLoggedInUser().userDetails.userRole == 'Administrator';
  }

  getPermissons() {
    if (this.getLoggedInUser().userDetails.permissions) {
      return this.getLoggedInUser().userDetails.permissions;
    }
  }

  storeXToken(data: XTokenResponse) {
    localStorage.setItem("xTD_tA21", JSON.stringify(data));
  }

  getXToken(): XTokenResponse | null {
    if (!!localStorage.getItem("xTD_tA21")) {
      return JSON.parse(localStorage.getItem("xTD_tA21"));
    } else {
      return null;
    }
  }

  storeLoggedInUser(data: LoggedInUserObject) {
    localStorage.setItem("xTD_tA32", JSON.stringify(data));
    this.updateUserData();
  }

  getLoggedInUser(): LoggedInUserObject | null {
    if (!!localStorage.getItem("xTD_tA32")) {
      return JSON.parse(localStorage.getItem("xTD_tA32"));
    } else {
      return null;
    }
  }

  storeCurrentEntity(data: EntityList) {
    localStorage.setItem("xTD_tA79", JSON.stringify(data));
  }

  getCurrentEntity(): EntityList | null {
    if (!!localStorage.getItem("xTD_tA79")) {
      return JSON.parse(localStorage.getItem("xTD_tA79"));
    } else {
      return null;
    }
  }

  userEntity(): string | null | undefined {
    if (!!this.getLoggedInUser()){
      return this.getLoggedInUser().userDetails.merchant?.entityCode
    }
  }

  rmvOnboardUserCode() {
    localStorage.removeItem("NewMerchCode");
  }

  storeOnboardUserCode(code: string) {
    localStorage.setItem("NewMerchCode", JSON.stringify(code));
  }

  getOnboardUserCode() {
    if (
      localStorage.getItem("NewMerchCode") !== null ||
      localStorage.getItem("NewMerchCode") !== undefined
    ) {
      return JSON.parse(localStorage.getItem("NewMerchCode"));
    } else {
      return false;
    }
  }

  getNewClientSubState(): boolean {
    if (
      localStorage.getItem("clientSubCheck") !== null ||
      localStorage.getItem("clientSubCheck") !== undefined
    ) {
      return JSON.parse(localStorage.getItem("clientSubCheck"));
    } else {
      return false;
    }
  }

  setNewClientSubState() {
    localStorage.setItem("clientSubCheck", JSON.stringify(true));
  }


  clearStorage() {
    localStorage.removeItem("xTD_tA21");
    localStorage.removeItem("xTD_tA32");
    localStorage.removeItem("clientSubCheck");
  }
}
