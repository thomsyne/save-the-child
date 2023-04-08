import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffContainerComponent } from './components/staff-container/staff-container.component';
import { MyStaffsRoutingModule } from './my-staffs-routing.module';
import { StaffControlComponent } from './components/staff-control/staff-control.component';
import { ManageStaffComponent } from './components/manage-staff/manage-staff.component';
import { ObserveStaffComponent } from './components/observe-staff/observe-staff.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { DynamicTableModule } from '@ga/dynamic-table';
import { SkeletonModule } from '@ga/skeleton';
import { UtilityModule } from '@ga/utility';
import { CreateStaffComponent } from './components/create-staff/create-staff.component';
import { DynamicFormModule } from '@ga/dynamic-form';
import { ModalModule } from '@ga/modal';
import { CreateRoleComponent } from './components/create-role/create-role.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';
import { UpdateStaffComponent } from './components/update-staff/update-staff.component';



@NgModule({
  declarations: [
    StaffContainerComponent,
    StaffControlComponent,
    ManageStaffComponent,
    ObserveStaffComponent,
    PermissionsComponent,
    CreateStaffComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    UpdateStaffComponent
  ],
  imports: [
    CommonModule,
    MyStaffsRoutingModule,
    DynamicTableModule,
    UtilityModule,
    SkeletonModule,
    DynamicFormModule,
    ModalModule
  ]
})
export class MyStaffsModule { }
