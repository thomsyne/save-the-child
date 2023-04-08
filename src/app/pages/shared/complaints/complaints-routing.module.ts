import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DisputeViewGuard } from "@ga/core";
import { ComplaintInfoComponent } from "./components/complaint-info/complaint-info.component";
import { ComplaintsContainerComponent } from "./components/complaints-container/complaints-container.component";
import { ComplaintsComponent } from "./components/complaints/complaints.component";

const routes: Routes = [
  {
    path: "",
    component: ComplaintsContainerComponent,
    children: [
      {
        path: "",
        component: ComplaintsComponent
      },
    ],
  },
  {
    path: ":id/details",
    component: ComplaintInfoComponent,
    canActivate: [DisputeViewGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ComplaintsRoutingModule {}
