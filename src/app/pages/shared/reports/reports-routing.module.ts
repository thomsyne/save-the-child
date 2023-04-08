import { SalesSettlementComponent } from './components/sales-settlement/sales-settlement.component';
import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BillingComponent } from "./components/billing/billing.component";
import { CashierReportsComponent } from "./components/cashier-reports/cashier-reports.component";
import { ReportsContainerComponent } from "./components/reoprts-container/reoprts-container.component";
import { ReportsControlComponent } from "./components/reports-control/reports-control.component";
import { SalesReportComponent } from "./components/sales-report/sales-report.component";
import { SalesReportDetailComponent } from "./components/sales-report-detail/sales-report-detail.component";
import { SettlementContainerComponent } from "./components/settlement-container/settlement-container.component";
import { SettlementsReportComponent } from "./components/settlements-report/settlements-report.component";
import { SettlementsComponent } from "./components/settlements/settlements.component";
import { BillingReportDetailComponent } from "./components/billing-report-detail/billing-report-detail.component";
import { ViewOrderGuard } from "@ga/core";
import { SalesContainerComponent } from "./components/sales-container/sales-container.component";
import { SalesComponent } from "./components/sales/sales.component";


const routes: Routes = [
  {
    path: "",
    component: ReportsContainerComponent,
    children: [
      {
        path: "",
        component: ReportsControlComponent
      },
      {
        path: "sales-details",
        canActivate: [ViewOrderGuard],
        children: [
          {
            path: ":id/details",
            component: SalesReportDetailComponent
          }
        ],
      },
      {
        path: "",
        component: SalesContainerComponent,
        children: [
          {
            path: "sales",
            component: SalesComponent
          },
          {
            path: "sales-reports",
            component: SalesReportComponent
          },
          {
            path: "sales-settlement",
            component: SalesSettlementComponent
          }
          // {
          //   path: ":id/details",
          //   component: SalesReportDetailComponent
          // },
        ]
      },
      {
        path: "",
        component: SettlementContainerComponent,
        children: [
          {
            path: "settlements",
            component: SettlementsComponent
          },
          {
            path: "settlements-reports",
            component: SettlementsReportComponent
          },
        ]
      },
      {
        path: "billings",
        children: [
          {
            path: "",
            component: BillingComponent
          },
          {
            path: ":id/billing-info",
            component: BillingReportDetailComponent
          },
          {
            path: ":id/billing-info/status",
            component: BillingReportDetailComponent
          },
          {
            path: ":id/billing-info/:reference/status",
            component: BillingReportDetailComponent
          }
        ]
      },
      {
        path: "cashiers",
        children: [
          {
            path: "",
            component: CashierReportsComponent
          },
          // {
          //   path: ":id/cashier-info",
          //   component: CashierReportDetailComponent
          // }
        ]
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
export class ReportsRoutingModule {}
