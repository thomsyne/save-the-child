import { EntityOrderDetailComponent } from './components/entity-order-detail/entity-order-detail.component';
import { ReportsModule } from './../../shared/reports/reports.module';
import { SharedModule } from './../../shared/shared.module';
import { EntityOrdersComponent } from './components/entity-orders/entity-orders.component';
import { EntityProfileComponent } from './components/entity-profile/entity-profile.component';
import { EntityContainerComponent } from "./components/entity-container/entity-container.component";
import { CreateEntityComponent } from "./components/create-entity/create-entity.component";
import { EntityListComponent } from "./components/entity-list/entity-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicTableModule } from "@ga/dynamic-table";
import { SkeletonModule } from "@ga/skeleton";
import { UtilityModule } from "@ga/utility";
import { DynamicFormModule } from "@ga/dynamic-form";
import { ModalModule } from "@ga/modal";
import { EntitiesRoutingModule } from "./entities-routing.module";
import { FileUploadModule } from "@ga/file-upload";

@NgModule({
  declarations: [
    EntityContainerComponent,
    EntityListComponent,
    CreateEntityComponent,
    EntityProfileComponent,
    EntityOrdersComponent,
    EntityOrderDetailComponent
  ],
  imports: [
    CommonModule,
    DynamicTableModule,
    EntitiesRoutingModule,
    UtilityModule,
    SkeletonModule,
    DynamicFormModule,
    ModalModule,
    FileUploadModule,
    ReportsModule
  ],
})
export class EntitiesModule {}
