import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ViewMerchantGuard } from "@ga/core";
import { AdminComponent } from "./components/admin/admin.component";
import { BusinessComponent } from "./components/business/business.component";
import { ProfileContainerComponent } from "./components/profile-container/profile-container.component";
import { SecurityComponent } from "./components/security/security.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileContainerComponent,
    children: [
      {
        path: "basic-info",
        component: AdminComponent
      },
      {
        path: "business-info",
        component: BusinessComponent,
        canActivate: [ViewMerchantGuard]
      },
      {
        path: "security",
        component: SecurityComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
