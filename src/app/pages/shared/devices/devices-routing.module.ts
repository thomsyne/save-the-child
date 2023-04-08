import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DevicesContainerComponent } from "./components/devices-container/devices-container.component";
import { DevicesComponent } from "./components/devices/devices.component";

const routes: Routes = [
  {
    path: "",
    component: DevicesContainerComponent,
    children: [
      {
        path: "",
        component: DevicesComponent
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
export class DevicesRoutingModule {}
