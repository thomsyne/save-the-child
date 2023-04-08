import { Injectable } from "@angular/core";

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService, StorageService, isNullOrUndefined } from "..";

@Injectable({
  providedIn: "root",
})
export class GaAdminGuard implements CanActivate {
  userToken: string = "";
  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: StorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!isNullOrUndefined(this.storage.getLoggedInUser())) {
      if (!this.storage.getLoggedInUser().userDetails.merchant) {
        return true;
      } else {
        this.authService.logout();
        return false;
      }
    } else {
      this.authService.logout();
      return false;
    }
  }
}