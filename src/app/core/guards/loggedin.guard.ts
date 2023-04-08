import { Injectable } from "@angular/core";

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

import { StorageService } from "../services";
import { isNullOrUndefined } from "../utils";


@Injectable({
  providedIn: "root",
})
export class LoggedInGuard implements CanActivate {
  userToken: string = "";
  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!isNullOrUndefined(this.storage.getLoggedInUser())) {
      return true;
    } else {
      this.router.navigate(["../login"]);
      return false;
    }
  }
}
