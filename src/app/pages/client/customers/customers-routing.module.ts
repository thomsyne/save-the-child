import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ViewOrderGuard } from "@ga/core";
import { AllCustomersComponent } from "./components/all-customers/all-customers.component";
import { CustomersContainerComponent } from "./components/customers-container/customers-container.component";
import { OrdersComponent } from "./components/orders/orders.component";


const routes: Routes = [
  {
    path: "",
    component: CustomersContainerComponent,
    children: [
      {
        path: "",
        component: AllCustomersComponent,
      },
      {
        path: ":id/orders",
        component: OrdersComponent,
        canActivate: [ViewOrderGuard]
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
export class CustomersRoutingModule {}
