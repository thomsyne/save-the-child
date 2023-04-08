import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsRoutingModule } from './shops-routing.module';
import { DynamicTableModule } from '@ga/dynamic-table';
import { SkeletonModule } from '@ga/skeleton';
import { UtilityModule } from '@ga/utility';
import { ShopContainerComponent } from './components/shop-container/shop-container.component';
import { ShopDashboardComponent } from './components/shop-dashboard/shop-dashboard.component';
import { DynamicFormModule } from '@ga/dynamic-form';
import { ModalModule } from '@ga/modal';



@NgModule({
  declarations: [
    ShopContainerComponent,
    ShopDashboardComponent,
    // ShopInventoryComponent,
    // ShopTransactionsComponent,
    // ShopsComponent,
    // ShopProfileComponent,
    // CreateShopComponent
  ],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    DynamicTableModule,
    UtilityModule,
    SkeletonModule,
    DynamicFormModule,
    ModalModule
  ]
})
export class ShopsModule { }
