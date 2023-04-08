import { VirtualAccountComponent } from './components/virtual-account/virtual-account.component';
import { RexpayAdvanceComponent } from './components/rexpay-advance/rexpay-advance.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PayMenuComponent } from "./components/pay-menu/pay-menu.component";
import { PaynowContainerComponent } from "./components/paynow-container/paynow-container.component";
import { PosComponent } from "./components/pos/pos.component";
import { RexpaySubscriptionComponent } from "./components/rexpay-subscription/rexpay-subscription.component";
import { RexpayComponent } from "./components/rexpay/rexpay.component";
import { TransferMenuComponent } from './components/transfer-menu/transfer-menu.component';
import { TransferAdvanceComponent } from './components/transfer-advance/transfer-advance.component';
import { TransferSubcriptionComponent } from './components/transfer-subcription/transfer-subcription.component';


const routes: Routes = [
  {
    path: "",
    component: PaynowContainerComponent,
    children: [
      {
        path: "",
        component: PayMenuComponent
      },
      {
        path: "pos",
        component: PosComponent
      },
      {
        path: "transfer",
        children: [
          {
            path: "",
            component: TransferMenuComponent
          },
          {
            path: "advance",
            component: TransferAdvanceComponent
          },
          {
            path: "virtual-account",
            component: VirtualAccountComponent
          },
          {
            path: "subscription",
            component: TransferSubcriptionComponent
          }
        ]
      },
      {
        path: "rexpay",
        children: [
          {
            path: "",
            component: RexpayComponent
          },
          {
            path: "advance",
            component: RexpayAdvanceComponent
          },
          {
            path: "subscription",
            component: RexpaySubscriptionComponent
          }
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
export class PayNowRoutingModule {}
