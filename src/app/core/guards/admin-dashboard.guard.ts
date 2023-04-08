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
export class AdminDashboardGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = this.storage.getPermissons();

    if (
      permissions.includes("CAN_VIEW_ADMIN_REPORT") ||
      permissions.includes("CAN_SEARCH_MERCHANT")
    ) {
      return true;
    } else {
      this.router.navigate(["admin-login"]);
    }
  }
}
