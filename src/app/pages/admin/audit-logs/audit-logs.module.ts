import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DynamicFormModule } from "@ga/dynamic-form";
import { DynamicTableModule } from "@ga/dynamic-table";
import { FileUploadModule } from "@ga/file-upload";
import { ModalModule } from "@ga/modal";
import { SkeletonModule } from "@ga/skeleton";
import { UtilityModule } from "@ga/utility";
import { AuditLogsRoutingModule } from "./audit-logs.routing.module";
import { AuditLogDetailComponent } from "./components/audit-log-detail/audit-log-detail.component";
import { AuditLogsContainerComponent } from "./components/audit-logs-container/audit-logs-container.component";
import { AuditLogsComponent } from "./components/audit-logs/audit-logs.component";

@NgModule({
    declarations: [
        AuditLogDetailComponent,
        AuditLogsComponent,
        AuditLogDetailComponent,
        AuditLogsContainerComponent
        
    ],
    imports: [
      CommonModule,
      DynamicTableModule,
      AuditLogsRoutingModule,
      UtilityModule,
      SkeletonModule,
      DynamicFormModule,
      ModalModule,
      FileUploadModule,
    ],
  })
  export class AuditLogsModule {}