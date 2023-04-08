import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminAndUserMgtGuard, AdminDashboardGuard, DeviceViewGuard, DisputeSearchGuard, GaAdminGuard, ProductMenuGuard, ReportMenuGuard, ViewCustomerGuard, ViewMerchantDashboardGuard } from "@ga/core";
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import("../../client/dashboard/dashboard.module").then(
          m => m.DashboardModule
        ),
        canActivate: []
      },
      {
        path: "admin-dashboard",
        loadChildren: () => import("../../admin/dashboard/dashboard.module").then(
          m => m.DashboardModule
        ),
        canActivate: [AdminDashboardGuard]
      },
      {
        path: "products",
        loadChildren: () => import("../../client/products/products.module").then(
          m => m.ProductsModule,
        ),
        canActivate: [ProductMenuGuard]
      },
      {
        path: "staff",
        loadChildren: () => import("../my-staffs/my-staffs.module").then(
          m => m.MyStaffsModule,
        ),
        canActivate: [AdminAndUserMgtGuard]
      },
      {
        path: "reports",
        loadChildren: () => import("../reports/reports.module").then(
          m => m.ReportsModule,
        ),
        canActivate: [ReportMenuGuard]
      },
      {
        path: "pay",
        loadChildren: () => import("../../client/pay-now/pay-now.module").then(
          m => m.PayNowModule,
        ),
      },
      {
        path: "profile",
        loadChildren: () => import("../../shared/profile/profile.module").then(
          m => m.ProfileModule,
        ),
      },
      {
        path: "customers",
        loadChildren: () => import("../../client/customers/customers.module").then(
          m => m.CustomersModule,
        ),
        canActivate: [ViewCustomerGuard],
      },
      {
        path: "devices",
        loadChildren: () => import("../devices/devices.module").then(
          m => m.DevicesModule
        ),
        canActivate: [DeviceViewGuard]
      },
      {
        path: "support",
        loadChildren: () => import("../complaints/complaints.module").then(
          m => m.ComplaintsModule
        ),
        canActivate: [DisputeSearchGuard]
      },
      {
        path: "subscriptions",
        loadChildren: () => import("../../admin/subscriptions/subscriptions.module").then(
          m => m.SubscriptionsModule
        ),
        canActivate: [GaAdminGuard]
      },
      {
        path: "merchants",
        loadChildren: () => import("../../admin/merchants/merchants.module").then(
          m => m.MerchantsModule
        ),
        canActivate: [GaAdminGuard]
      },
      {
        path: "entities",
        loadChildren: () => import("../../admin/entities/entities.module").then(
          m => m.EntitiesModule
        ),
        canActivate: [GaAdminGuard]
      },
      {
        path: "banks",
        loadChildren: () => import("../../admin/banks/banks.module").then(
          m => m.BanksModule
        ),
        canActivate: [GaAdminGuard]
      },
      {
        path: "audits",
        loadChildren: () => import("../../admin/audit-logs/audit-logs.module").then(
          m => m.AuditLogsModule
        ),
        canActivate: [GaAdminGuard]
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
export class LayoutRoutingModule {}
