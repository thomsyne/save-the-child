import { BillingPaymentUpdateComponent } from './components/billing-report-detail/billing-payment-update/billing-payment-update.component';
import { EntityOrderTableComponent } from './components/entity-order-table/entity-order-table.component';
import { SalesSettlementComponent } from './components/sales-settlement/sales-settlement.component';
import { BillingSubscriptionUpdateComponent } from './components/billing-report-detail/billing-subscription-update/billing-subscription-update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsContainerComponent } from './components/reoprts-container/reoprts-container.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsControlComponent } from './components/reports-control/reports-control.component';
import { SalesReportDetailComponent } from './components/sales-report-detail/sales-report-detail.component';
import { SettlementsComponent } from './components/settlements/settlements.component';
import { BillingComponent } from './components/billing/billing.component';
import { DynamicTableModule } from '@ga/dynamic-table';
import { SkeletonModule } from '@ga/skeleton';
import { UtilityModule } from '@ga/utility';
import { SalesReportComponent } from './components/sales-report/sales-report.component';
import { SettlementsReportComponent } from './components/settlements-report/settlements-report.component';
import { SettlementsTableComponent } from './components/settlements-table/settlements-table.component';
import { SalesReportTableComponent } from './components/sales-report-table/sales-report-table.component';
import { BillingReportTableComponent } from './components/billing-report-table/billing-report-table.component';
import { CashierReportsComponent } from './components/cashier-reports/cashier-reports.component';
import { SettlementContainerComponent } from './components/settlement-container/settlement-container.component';
import { BillingReportDetailComponent } from './components/billing-report-detail/billing-report-detail.component';
import { ModalModule } from '@ga/modal';
import { DynamicFormModule } from '@ga/dynamic-form';
import { SharedModule } from '../shared.module';
import { SalesContainerComponent } from './components/sales-container/sales-container.component';
import { SalesComponent } from './components/sales/sales.component';
import { FileUploadModule } from '@ga/file-upload';



@NgModule({
  declarations: [
    ReportsContainerComponent,
    ReportsControlComponent,
    CashierReportsComponent,
    SalesReportDetailComponent,
    SettlementsComponent,
    BillingComponent,
    SalesReportComponent,
    SettlementsReportComponent,
    SettlementsTableComponent,
    SalesReportTableComponent,
    BillingReportTableComponent,
    SettlementContainerComponent,
    BillingReportDetailComponent,
    SalesContainerComponent,
    SalesComponent,
    SalesSettlementComponent,
    BillingSubscriptionUpdateComponent,
    BillingPaymentUpdateComponent,
    EntityOrderTableComponent

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    DynamicTableModule,
    UtilityModule,
    SkeletonModule,
    ModalModule,
    DynamicFormModule,
    SharedModule,
    FileUploadModule
  ],
  exports: [
    SettlementsTableComponent,
    SalesReportTableComponent,
    BillingReportTableComponent,
    EntityOrderTableComponent,
    SalesReportDetailComponent
  ]
})
export class ReportsModule { }
