import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SubscriptionsContainerComponent } from "./components/subscriptions-container/subscriptions-container.component";
import { SubscriptionsComponent } from "./components/subscriptions/subscriptions.component";
import { UpdateSubscriptionComponent } from "./components/update-subscription/update-subscription.component";


const routes: Routes = [
  {
    path: "",
    component: SubscriptionsContainerComponent,
    children: [
      {
        path: "",
        component: SubscriptionsComponent,
      },
      {
        path: ":id/edit",
        component: UpdateSubscriptionComponent
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
export class SubscriptionRoutingModule {}
