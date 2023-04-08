import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantsRoutingModule } from './merchants-routing.module';
import { DynamicTableModule } from '@ga/dynamic-table';
import { SkeletonModule } from '@ga/skeleton';
import { AlertModule, UtilityModule } from '@ga/utility';
import { MerchantsComponent } from './components/merchants/merchants.component';
import { MerchantsContainerComponent } from './components/merchants-container/merchants-container.component';
import { MerchantSalesReportComponent } from './components/merchant-sales-report/merchant-sales-report.component';
import { MerchantBillingReportComponent } from './components/merchant-billing-report/merchant-billing-report.component';
import { MerchantSettlementReportComponent } from './components/merchant-settlement-report/merchant-settlement-report.component';
import { MerchantProfileComponent } from './components/merchant-profile/merchant-profile.component';
import { ReportsModule } from '../../shared/reports/reports.module';
import { CreateMerchantComponent } from './components/create-merchant/create-merchant.component';
import { DynamicFormModule } from '@ga/dynamic-form';
import { ModalModule } from '@ga/modal';
import { SingleMerchantComponent } from './components/single-merchant/single-merchant.component';



@NgModule({
  declarations: [
    MerchantsComponent,
    MerchantsContainerComponent,
    MerchantSalesReportComponent,
    MerchantBillingReportComponent,
    MerchantSettlementReportComponent,
    MerchantProfileComponent,
    CreateMerchantComponent,
    SingleMerchantComponent
  ],
  imports: [
    CommonModule,
    MerchantsRoutingModule,
    DynamicTableModule,
    UtilityModule,
    SkeletonModule,
    ReportsModule,
    DynamicFormModule,
    ModalModule,
    AlertModule
  ]
})
export class MerchantsModule { }
