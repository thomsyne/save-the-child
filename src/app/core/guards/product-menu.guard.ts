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
export class ProductMenuGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = this.storage.getPermissons();

    if (
      permissions.includes("CAN_VIEW_PRODUCT") ||
      permissions.includes("CAN_VIEW_CATEGORY") ||
      permissions.includes("CAN_VIEW_INVENTORY") ||
      permissions.includes("CAN_CREATE_PRODUCT")
    ) {
      return true;
    } else {
      this.router.navigate(["dashboard"]);
    }
  }
}
