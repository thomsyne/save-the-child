import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { ComplaintsContainerComponent } from './components/complaints-container/complaints-container.component';
import { DynamicTableModule } from '@ga/dynamic-table';
import { SkeletonModule } from '@ga/skeleton';
import { UtilityModule } from '@ga/utility';
import { ComplaintsRoutingModule } from './complaints-routing.module';
import { CreateComplaintComponent } from './components/create-complaint/create-complaint.component';
import { DynamicFormModule } from '@ga/dynamic-form';
import { ModalModule } from '@ga/modal';
import { ComplaintInfoComponent } from './components/complaint-info/complaint-info.component';



@NgModule({
  declarations: [
    ComplaintsComponent,
    ComplaintsContainerComponent,
    CreateComplaintComponent,
    ComplaintInfoComponent
  ],
  imports: [
    CommonModule,
    ComplaintsRoutingModule,
    DynamicTableModule,
    UtilityModule,
    SkeletonModule,
    DynamicFormModule,
    ModalModule
  ]
})
export class ComplaintsModule { }
