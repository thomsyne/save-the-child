import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsContainerComponent } from './components/subscriptions-container/subscriptions-container.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionRoutingModule } from './subscriptions-routing.module';
import { DynamicTableModule } from '@ga/dynamic-table';
import { SkeletonModule } from '@ga/skeleton';
import { UtilityModule } from '@ga/utility';
import { CreateSubscriptionComponent } from './components/create-subscription/create-subscription.component';
import { DynamicFormModule } from '@ga/dynamic-form';
import { ModalModule } from '@ga/modal';
import { UpdateSubscriptionComponent } from './components/update-subscription/update-subscription.component';



@NgModule({
  declarations: [
    SubscriptionsContainerComponent,
    SubscriptionsComponent,
    CreateSubscriptionComponent,
    UpdateSubscriptionComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    DynamicTableModule,
    UtilityModule,
    SkeletonModule,
    DynamicFormModule,
    ModalModule
  ]
})
export class SubscriptionsModule { }
