import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShopContainerComponent } from "./components/shop-container/shop-container.component";
import { ShopDashboardComponent } from "./components/shop-dashboard/shop-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: ShopContainerComponent,
    children: [
      {
        path: "",
        // component: ShopsComponent
      },
      {
        path: ":id",
        children: [
          {
            path: "dashboard",
            component: ShopDashboardComponent
          },
          // {
          //   path: "inventory",
          //   component: ShopInventoryComponent
          // },
          // {
          //   path: "transactions",
          //   component: ShopTransactionsComponent
          // },
          // {
          //   path: "profile",
          //   component: ShopProfileComponent
          // },
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
export class ShopsRoutingModule {}
