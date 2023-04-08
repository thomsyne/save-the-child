import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { InterceptorProviders } from "@ga/core";
import { UtilityModule, AlertModule } from "@ga/utility";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/admin/authentication/login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    UtilityModule,
    AlertModule,
    ScullyLibModule
  ],
  providers: [InterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
