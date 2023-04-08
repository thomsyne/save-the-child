import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTableComponent, DateService, StorageService } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { map } from 'rxjs/operators';
import { ReportsService } from '../../services/reports.service';
import { cashierTableSettings, filters, downloadCSvheaders } from './cashier-reports.constants';

@Component({
  selector: 'app-cashier-reports',
  templateUrl: './cashier-reports.component.html',
  styleUrls: ['./cashier-reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashierReportsComponent extends BaseTableComponent implements OnInit {

  constructor(
    paginationService: PaginationService,
    private router: Router,
    private storageService: StorageService,
    private reportsService: ReportsService,
    private alertService: AlertService,
    private dateService: DateService,
    private fileService: FileGenerationService
  ) {
    super(paginationService);
    this.tableSettings = cashierTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [];
    // this.filters[2].defaultValue = this.dateService.formatStartDate(this.filters[2].defaultValue);
    // this.filters[3].defaultValue = this.dateService.formatEndDate(this.filters[3].defaultValue);
  }
  merchantId: number;

  ngOnInit(): void {
    this.getMerchantId();
  }

  getMerchantId() {
    this.merchantId = this.storageService.getLoggedInUser().userDetails.merchant.id;
  }

  getCashierReport() {
    const { firstName, lastName, startDate, endDate } = this.filterValues;

    if (startDate > new Date() || (endDate && startDate > endDate)) {
      return this.alertService.info("Invalid Start Date", false);
    }

    const response$ = this.reportsService.fetchCashierReports(
      this.merchantId,
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        firstName,
        lastName,
        startDate,
        endDate
      }
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex = 0;
    this.paginationValues.currentPage = 1;
    this.getCashierReport();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getCashierReport();
  }

  generateCsv() {
    const { firstName, lastName, startDate, endDate } = this.filterValues;
    this.subscriptions.push(
      this.reportsService
      .fetchCashierReports(
        this.merchantId,
        this.paginationValues.pageIndex,
        this.paginationValues.pageSize,
        {
          firstName,
          lastName,
          startDate,
          endDate
        }
      )
      .pipe(
        map((res) => {
          let csvData = [];
          res.data.forEach((el) => {
            const {
              firstName,
              lastName,
              currentStore,
              totalAmount,
              cashPaymentCount,
              cashPaymentValue,
              cardPaymentCount,
              cardPaymentValue,
            } = el;


            const dump = {
              firstName,
              lastName,
              currentStore,
              totalAmount,
              cashPaymentCount,
              cashPaymentValue,
              cardPaymentCount,
              cardPaymentValue,
            };

            csvData.push(dump);
          });

          return csvData;
        })
      )
      .subscribe((res) => {
        this.fileService.generateCSV(
          res,
          "Cashier Report",
          this.downloadCSvheaders
        );
      })
    )
  }
}
