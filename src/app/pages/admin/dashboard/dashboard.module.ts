import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { UtilityModule } from '@ga/utility';


const routes: Routes = [
  {
    path: "",
    component: AdminDashboardComponent
  },
];


@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilityModule
  ]
})
export class DashboardModule { }
