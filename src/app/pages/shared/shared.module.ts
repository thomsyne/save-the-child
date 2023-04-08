import { PoweredByComponent } from './components/powered-by/powered-by.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardDonutContainerComponent } from "./components/dashboard-donut-container/dashboard-donut-container.component";
import { InitiatePaymentComponent } from "./components/initiate-payment/initiate-payment.component";
import { ChartModule } from "@ga/charts";
import { TermsDataComponent } from "./components/terms-data/terms-data.component";
import { AccountLookupComponent } from "./components/account-lookup/account-lookup.component";
import { DynamicFormModule } from "@ga/dynamic-form";
import { UtilityModule } from "@ga/utility";

@NgModule({
  imports: [CommonModule, ChartModule, DynamicFormModule, UtilityModule],
  declarations: [
    InitiatePaymentComponent,
    DashboardDonutContainerComponent,
    TermsDataComponent,
    AccountLookupComponent,
    PoweredByComponent
  ],
  exports: [
    InitiatePaymentComponent,
    DashboardDonutContainerComponent,
    TermsDataComponent,
    AccountLookupComponent,
    PoweredByComponent
  ],
  providers: [],
})
export class SharedModule {}
