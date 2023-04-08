import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ForgotPinComponent } from "./forgot-pin/forgot-pin.component";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./login/login.component";
import { RecoverPinComponent } from "./recover-pin/recover-pin.component";
import { RegistrationSuccessComponent } from "./registration-success/registration-success.component";
import { SetPinComponent } from "./set-pin/set-pin.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: LoginComponent,
      },
      {
        path: "reset-password",
        component: ForgotPinComponent,
      },
      {
        path: "recover-password/:username/:merchantCode/:name",
        component:RecoverPinComponent,
      },
      {
        path: "complete-user-registration/:username/:merchantCode/:name",
        component:SetPinComponent,
      },
      {
        path: "complete-user-registration/:username/:merchantCode/:name/:token",
        component:SetPinComponent,
      },
      {
        path: "registration-success",
        component: RegistrationSuccessComponent,
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
export class AuthenticationRoutingModule {}
