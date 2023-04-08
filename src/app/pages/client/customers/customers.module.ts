import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersContainerComponent } from './components/customers-container/customers-container.component';
import { DynamicTableModule } from '@ga/dynamic-table';
import { SkeletonModule } from '@ga/skeleton';
import { UtilityModule } from '@ga/utility';
import { OrdersComponent } from './components/orders/orders.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { DynamicFormModule } from '@ga/dynamic-form';
import { ModalModule } from '@ga/modal';
import { ViewOrderComponent } from './components/view-order/view-order.component';



@NgModule({
  declarations: [
    AllCustomersComponent,
    CustomersContainerComponent,
    OrdersComponent,
    CreateCustomerComponent,
    ViewOrderComponent,
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    DynamicTableModule,
    UtilityModule,
    SkeletonModule,
    DynamicFormModule,
    ModalModule
  ]
})
export class CustomersModule { }
