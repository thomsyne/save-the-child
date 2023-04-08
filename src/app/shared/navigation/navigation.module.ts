import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SideNavigationComponent } from "./side-navigation/side-navigation.component";
import { TopNavigationComponent } from "./top-navigation/top-navigation.component";
import { UtilityModule } from "../utility/utility.module";

@NgModule({
  declarations: [SideNavigationComponent, TopNavigationComponent],
  imports: [CommonModule, RouterModule, UtilityModule],
  exports: [SideNavigationComponent, TopNavigationComponent],
})
export class NavigationModule {}
