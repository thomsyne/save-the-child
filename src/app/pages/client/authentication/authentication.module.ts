import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SetPinComponent } from './set-pin/set-pin.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { UtilityModule } from '@ga/utility';
import { DynamicFormModule } from '@ga/dynamic-form';
import { AlertModule } from 'src/app/shared/utility/alert/alert.module';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';
import { RecoverPinComponent } from './recover-pin/recover-pin.component';



@NgModule({
  declarations: [
    LoginComponent,
    SetPinComponent,
    LayoutComponent,
    RegistrationSuccessComponent,
    ForgotPinComponent,
    RecoverPinComponent
  ],
  imports: [
    CommonModule,
    UtilityModule,
    DynamicFormModule,
    AuthenticationRoutingModule,
    AlertModule
  ]
})
export class AuthenticationModule { }
