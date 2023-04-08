import { VirtualAccountComponent } from './components/virtual-account/virtual-account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaynowContainerComponent } from './components/paynow-container/paynow-container.component';
import { PayMenuComponent } from './components/pay-menu/pay-menu.component';
import { PayNowRoutingModule } from './pay-now-routing.module';
import { PosComponent } from './components/pos/pos.component';
import { RexpayComponent } from './components/rexpay/rexpay.component';
import { RexpaySubscriptionComponent } from './components/rexpay-subscription/rexpay-subscription.component';
import { DynamicFormModule } from '@ga/dynamic-form';
import { SkeletonModule } from '@ga/skeleton';
import { UtilityModule } from '@ga/utility';
import { ModalModule } from '@ga/modal';
import { SharedModule } from '../../shared/shared.module';
import { RexpayAdvanceComponent } from './components/rexpay-advance/rexpay-advance.component';
import { TransferMenuComponent } from './components/transfer-menu/transfer-menu.component';
import { TransferAdvanceComponent } from './components/transfer-advance/transfer-advance.component';
import { TransferSubcriptionComponent } from './components/transfer-subcription/transfer-subcription.component';



@NgModule({
  declarations: [
    PaynowContainerComponent,
    PayMenuComponent,
    PosComponent,
    RexpayComponent,
    RexpaySubscriptionComponent,
    RexpayAdvanceComponent,
    TransferMenuComponent,
    TransferAdvanceComponent,
    VirtualAccountComponent,
    TransferSubcriptionComponent
  ],
  imports: [
    CommonModule,
    PayNowRoutingModule,
    UtilityModule,
    SkeletonModule,
    DynamicFormModule,
    ModalModule,
    SharedModule
  ]
})
export class PayNowModule { }
