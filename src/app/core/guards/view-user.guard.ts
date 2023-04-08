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
export class ViewUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isGaAdmin = this.storage.isGaAdmin();
    const permissions = this.storage.getPermissons();

    if (
      permissions.includes("CAN_VIEW_ALL_USER") || permissions.includes("CAN_VIEW_USER")
    ) {
      return true;
    } else {
      isGaAdmin ? this.router.navigate(["admin-dashboard"]) : this.router.navigate(["dashboard"]);
    }

  }
}

