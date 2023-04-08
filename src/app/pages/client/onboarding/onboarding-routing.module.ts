import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OnboardingContainerComponent } from "./components/onboarding-container/onboarding-container.component";

const routes: Routes = [
  {
    path: "",
    component: OnboardingContainerComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
