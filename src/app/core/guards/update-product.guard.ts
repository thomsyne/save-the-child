import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { StorageService } from "../services";

@Injectable({
  providedIn: "root",
})
export class UpdateProductGuard implements CanActivate {

  constructor(private router: Router, private storage: StorageService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = this.storage.getPermissons();

    if (permissions.includes("CAN_UPDATE_PRODUCT")) {
      return true;
    } else {
      this.router.navigate(["dashboard"]);
    }
  }
}
