import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { AuthService, StorageService, UserDetails } from "@ga/core";
import { SideNavigation } from "@ga/navigation";
import {
  adminNavConfig,
  adminNavConfigMinor,
  clientNavConfig,
  clientNavConfigMinor,
} from "./layout.constants";
import { Router } from "@angular/router";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {

  isNavOpen: boolean;
  user: UserDetails;
  permissions!: string[];


  navConfig: SideNavigation[] = this.storageService.isGaAdmin()
    ? adminNavConfig
    : clientNavConfig;

  navConfigMinor: SideNavigation[] = this.storageService.isGaAdmin()
    ? adminNavConfigMinor
    : clientNavConfigMinor;

  links: string[] = this.storageService.isGaAdmin()
    ? ["Logout"]
    : ["My Profile", "Logout"];
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  dropDownClick(linkName: string) {
    if (linkName === "My Profile")
      this.router.navigate(["./profile/basic-info"]);
    if (linkName === "Logout") this.authService.logout();
  }

  ngOnInit() {
    this.storageService.userData$.subscribe((user) => {
      this.user = user.userDetails;
      this.permissions = user.userDetails.permissions;
    });
  }
}
