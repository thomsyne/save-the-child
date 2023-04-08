import { StorageService } from '@ga/core';
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTableComponent, DateService } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { map } from 'rxjs/operators';

import { ReportsService } from '../../services/reports.service';
import { settlementsReportsTableSettings, filters, downloadCSvheaders } from './settlements-report.constants';

@Component({
  selector: 'app-settlements-table',
  templateUrl: './settlements-table.component.html',
  styleUrls: ['./settlements-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettlementsTableComponent  extends BaseTableComponent implements OnInit {

  @Input() merchantId: number;

  constructor(
    paginationService: PaginationService,
    private router: Router,
    private reportsService: ReportsService,
    private alertService: AlertService,
    private dateService: DateService,
    private fileService: FileGenerationService,
    private storageService: StorageService,
    private ref: ChangeDetectorRef
  ) {
    super(paginationService);
    this.tableSettings = settlementsReportsTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Requery",
        params: ["reference", "amount"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (reference, amount) => {
          this.postExecuteTSQ(reference, amount)
        },
        condition: (data) => {
          return (this.storageService.isGaAdmin() && data.status !== 'Success');
        }
      },
    ];
    // this.filters[2].defaultValue = this.dateService.formatStartDate(this.filters[2].defaultValue);
    // this.filters[3].defaultValue = this.dateService.formatEndDate(this.filters[3].defaultValue);
  }

  ngOnInit(): void {
  }

  getSettlementsReports() {
    const { reference, status, startDate, endDate } = this.filterValues;

    if (startDate > new Date() || (endDate && startDate > endDate)) {
      return this.alertService.info("Invalid Start Date");
      return;
    }

    const response$ = this.reportsService.fetchSettlementsReports(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        reference,
        status,
        startDate,
        endDate
      },
      this.merchantId,
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  postExecuteTSQ(transactionReference: string, amount: number){
    this.alertService.warn('TSQ in progress. Please wait...')

    let payload = {
      transactionReference,
      amount
    }

    this.reportsService.postSettlementTSQ(payload).subscribe((res) => {
        this.alertService.success('TSQ Successful! The current status of #' + transactionReference + ' is ' + res.status);
        this.getSettlementsReports()
        this.ref.detectChanges()
    })
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex = 0;
    this.paginationValues.currentPage = 1;
    this.getSettlementsReports();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getSettlementsReports();
  }

  generateCsv() {
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));
const { reference, status, startDate, endDate } = this.filterValues;

    this.subscriptions.push(
      this.reportsService
        .fetchSettlementsReports(0, count,
          {
            reference,
            status,
            startDate,
            endDate
          },
          this.merchantId
        )
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                reference,
                merchantName,
                createdOn,
                initiatedBy,
                amount,
                updatedOn,
                status,
              } = el;

              const dump = {
                reference,
                merchantName,
                createdOn,
                initiatedBy,
                amount,
                updatedOn,
                status,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Settlement Report",
            this.downloadCSvheaders
          );
        })
    );
  }
}
