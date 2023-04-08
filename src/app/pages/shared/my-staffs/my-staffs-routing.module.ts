import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageRoleGuard, SearchAllUserGuard, ViewRoleGuard, ViewRolesGuard, ViewUserGuard } from "@ga/core";
import { CreateRoleComponent } from "./components/create-role/create-role.component";
import { ManageStaffComponent } from "./components/manage-staff/manage-staff.component";
import { ObserveStaffComponent } from "./components/observe-staff/observe-staff.component";
import { PermissionsComponent } from "./components/permissions/permissions.component";
import { StaffContainerComponent } from "./components/staff-container/staff-container.component";
import { StaffControlComponent } from "./components/staff-control/staff-control.component";
import { UpdateRoleComponent } from "./components/update-role/update-role.component";
import { UpdateStaffComponent } from "./components/update-staff/update-staff.component";

const routes: Routes = [
  {
    path: "",
    component: StaffContainerComponent,
    children: [
      {
        path: "",
        component: StaffControlComponent
      },
      {
        path: "manage",
        component: ManageStaffComponent,
        canActivate: [SearchAllUserGuard]
      },
      {
        path: ":id/edit",
        component: UpdateStaffComponent,
        canActivate: [ViewUserGuard]
      },
      {
        path: "permissions",
        canActivate: [ViewRolesGuard],
        children: [
          {
            path: "",
            component: PermissionsComponent
          },
          {
            path: "create-role",
            component: CreateRoleComponent,
            canActivate: [ManageRoleGuard]
          },
          {
            path: ":name/update-role",
            component: UpdateRoleComponent,
            canActivate: [ViewRoleGuard]
          }
        ]
      },
      {
        path: "observe",
        component: ObserveStaffComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MyStaffsRoutingModule {}
