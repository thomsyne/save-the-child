import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuditLogDetailComponent } from "./components/audit-log-detail/audit-log-detail.component";
import { AuditLogsContainerComponent } from "./components/audit-logs-container/audit-logs-container.component";
import { AuditLogsComponent } from "./components/audit-logs/audit-logs.component";

const routes: Routes = [
    {
        path: "",
        component: AuditLogsContainerComponent,
        children: [
          {
            path: "",
            component: AuditLogsComponent,
          }
        ]
    },
    {
        path: "log-details",
        children: [
          {
            path: ":id",
            component: AuditLogDetailComponent
          }
        ],
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
  })
  export class AuditLogsRoutingModule {}
