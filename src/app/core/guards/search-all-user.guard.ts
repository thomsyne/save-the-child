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
export class SearchAllUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = this.storage.getPermissons();
    const isGaAdmin = this.storage.isGaAdmin();

    if (!isGaAdmin) return true;

    if (permissions.includes("CAN_SEARCH_ALL_USER")) {
      return true;
    } else {
      this.router.navigate(["admin-dashboard"]);
    }
  }
}
