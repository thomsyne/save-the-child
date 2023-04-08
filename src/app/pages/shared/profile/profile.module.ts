import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SecurityComponent } from "./components/security/security.component";
import { AdminComponent } from "./components/admin/admin.component";
import { BusinessComponent } from "./components/business/business.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ProfileContainerComponent } from "./components/profile-container/profile-container.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { DynamicFormModule } from "@ga/dynamic-form";
import { ModalModule } from "@ga/modal";
import { SkeletonModule } from "@ga/skeleton";
import { UtilityModule } from "@ga/utility";
import { SharedModule } from "../shared.module";

@NgModule({
  declarations: [
    SecurityComponent,
    AdminComponent,
    BusinessComponent,
    SettingsComponent,
    ProfileContainerComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UtilityModule,
    SkeletonModule,
    DynamicFormModule,
    ModalModule,
    SharedModule,
  ],
})
export class ProfileModule {}
