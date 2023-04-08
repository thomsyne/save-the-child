import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MerchantBillingReportComponent } from "./components/merchant-billing-report/merchant-billing-report.component";
import { MerchantProfileComponent } from "./components/merchant-profile/merchant-profile.component";
import { MerchantSalesReportComponent } from "./components/merchant-sales-report/merchant-sales-report.component";
import { MerchantSettlementReportComponent } from "./components/merchant-settlement-report/merchant-settlement-report.component";
import { MerchantsContainerComponent } from "./components/merchants-container/merchants-container.component";
import { MerchantsComponent } from "./components/merchants/merchants.component";
import { SingleMerchantComponent } from "./components/single-merchant/single-merchant.component";



const routes: Routes = [
  {
    path: "",
    component: MerchantsContainerComponent,
    children: [
      {
        path: "",
        component: MerchantsComponent,
      },
      {
        path: ":id",
        component: SingleMerchantComponent,
        children: [
          {
            path: "sales",
            component: MerchantSalesReportComponent
          },
          {
            path: "billings",
            component: MerchantBillingReportComponent
          },
          {
            path: "settlements",
            component: MerchantSettlementReportComponent
          },
          {
            path: "profile",
            component: MerchantProfileComponent
          },
        ],
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
export class MerchantsRoutingModule {}
