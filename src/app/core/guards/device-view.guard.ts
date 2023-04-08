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
export class DeviceViewGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = this.storage.getPermissons();
    const isGaAdmin =  this.storage.isGaAdmin();

    if (
      permissions.includes("CAN_VIEW_ALL_DEVICES") ||
      permissions.includes("CAN_VIEW_DEVICE")
    ) {
      return true;
    } else {
      isGaAdmin ?
      this.router.navigate(["admin-dashboard"]) :
      this.router.navigate(["dashboard"]);
    }
  }
}
