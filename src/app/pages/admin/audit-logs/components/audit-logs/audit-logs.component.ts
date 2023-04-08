import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseTableComponent, DateService } from '@ga/core';
import { PaginationService, FileGenerationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { map } from 'rxjs/operators';
import { salesReportsTableSettings } from 'src/app/pages/shared/reports/components/sales-report-table/sales-report.constants';
import { AuditLogsService } from '../../services/audit-logs.service';
import { filters, downloadCSvheaders, auditLogsTableSettings } from './audit-logs.constants';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuditLogsComponent extends BaseTableComponent implements OnInit {

  @Input() merchantId: number;
  constructor(
    paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    private auditLogsService: AuditLogsService,
    private alertService: AlertService,
    private dateService: DateService,
    private fileService: FileGenerationService
  ) {
    super(paginationService);
    this.tableSettings = auditLogsTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`audits/log-details/${id}`], {
            
          });
        },
      },
    ];

  }

  ngOnInit(): void {
    this.getAllAuditLogs()
  }

  getAllAuditLogs() {

    let payload = {
      pageIndex:this.paginationValues.pageIndex,
      pageSize:this.paginationValues.pageSize,
      actionType:this.filterValues?.actionType,
      severityLevel:this.filterValues?.severityLevel,
      startDate:this.filterValues?.startDate,
      modifiedDate:this.filterValues?.modifiedDate
    }

    const response$ = this.auditLogsService.fetchAllAuditLogs(payload);
    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));

  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex =
      +this.route.snapshot.queryParamMap.get("pageIndex") || 0;
    this.paginationValues.currentPage =
      +this.route.snapshot.queryParamMap.get("currentPage") || 1;
    this.getAllAuditLogs();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getAllAuditLogs();
  }
  

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    let payload = {
      pageIndex:this.paginationValues.pageIndex,
      pageSize:count,
      actionType:this.filterValues?.actionType,
      severityLevel:this.filterValues?.severityLevel,
      startDate:this.filterValues?.startDate,
      modifiedDate:this.filterValues?.modifiedDate
    }

    this.subscriptions.push(
      this.auditLogsService
      .fetchAllAuditLogs(payload)
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                createdOn,
                actionType,
                severityLevel,
                affectedUser,
                lastModifiedOn,

              } = el;

              const dump = {
                createdOn,
                actionType,
                severityLevel,
                affectedUser,
                lastModifiedOn,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Audit Logs",
            this.downloadCSvheaders
          );
        })
    );
  }

}
