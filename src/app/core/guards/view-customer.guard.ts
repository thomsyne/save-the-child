import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ViewCustomerGuard implements CanActivate {

  constructor(
      private router: Router,
      private storageService: StorageService
    ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = this.storageService.getPermissons();

    if (permissions.includes("CAN_VIEW_CUSTOMER")) {
      return true;
    } else {
      this.router.navigate(["dashboard"]);
    }
    return true;
  }

}
