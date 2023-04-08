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
export class ReportMenuGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = this.storage.getPermissons();
    const isGaAdmin = this.storage.isGaAdmin();

    if (
      permissions.includes("CAN_VIEW_MERCHANT_BILL") ||
      permissions.includes("CAN_VIEW_SETTLEMENT") ||
      permissions.includes("CAN_VIEW_ORDER") ||
      permissions.includes("CAN_VIEW_ALL_ORDERS") ||
      permissions.includes("CAN_VIEW_ALL_SETTLEMENT") ||
      permissions.includes("CAN_VIEW_ALL_MERCHANTS_BILL")
    ) {
      return true;
    } else {
      isGaAdmin ? this.router.navigate(["admin-dashboard"]) : this.router.navigate(["dashboard"]);
    }
  }
}
