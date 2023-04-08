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
export class DisputeSearchGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = this.storage.getPermissons();
    const isGaAdmin = this.storage.isGaAdmin();

    if (
      permissions.includes("CAN_SEARCH_DISPUTE") ||
      permissions.includes("CAN_SEARCH_ALL_DISPUTES")
    ) {
      return true;
    } else {
      isGaAdmin ?
      this.router.navigate(["admin-dashboard"]) :
      this.router.navigate(["dashboard"]);
    }
  }
}
