import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonModule } from '@ga/skeleton';
import { UtilityModule } from '@ga/utility';

import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { FirstActionComponent } from './components/first-action/first-action.component';
import { SharedModule } from '../../shared/shared.module';



const routes: Routes = [
  {
    path: "",
    redirectTo: "client",
    pathMatch: "full"
  },
  {
    path: "client",
    component: ClientDashboardComponent
  },
];

@NgModule({
  declarations: [ClientDashboardComponent, FirstActionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilityModule,
    SkeletonModule,
    SharedModule
  ]
})
export class DashboardModule { }
