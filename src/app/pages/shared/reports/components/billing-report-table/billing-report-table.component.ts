import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent, DateService, StorageService, TableDataResponse } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillingReport } from '../..';
import { ReportsService } from '../../services/reports.service';
import { billingsTableSettings, downloadCSvheaders, filters } from './billings.constants';

@Component({
  selector: 'app-billing-report-table',
  templateUrl: './billing-report-table.component.html',
  styleUrls: ['./billing-report-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingReportTableComponent extends BaseTableComponent implements OnInit {

  @Input() merchantIdFromAdmin: number;
  merchantId: number;

  constructor(
    paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    private reportsService: ReportsService,
    private storageService: StorageService,
    private dateService: DateService,
    private fileService: FileGenerationService
  ) {
    super(paginationService);
    this.tableSettings = billingsTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`reports/billings/${id}/billing-info`], {
            queryParams: {
              startDate: this.filterValues.startDate,
              endDate: this.filterValues.endDate,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
            },
          });
        },
      },
    ];
    // this.filters[0].defaultValue = this.dateService.formatStartDate(this.filters[0].defaultValue);
    // this.filters[1].defaultValue = this.dateService.formatEndDate(this.filters[1].defaultValue);
  }

  ngOnInit(): void {
    if (!this.merchantIdFromAdmin) this.getMerchantId();

    // if (this.storageService.isGaAdmin()) {
    //   this.buttonSettings = [];
    // }
  }

  getMerchantId() {
    if (!this.storageService.isGaAdmin())
    this.merchantId = this.storageService.getLoggedInUser().userDetails.merchant.id;
  }

  getBillings() {
    const { startDate, endDate, merchantName } = this.filterValues;
    let response$: Observable<TableDataResponse<BillingReport>>;

    if (this.storageService.isGaAdmin() && !this.merchantIdFromAdmin ) {
      response$ = this.reportsService.fetchAdminBillingReports(
        this.paginationValues.pageIndex,
        this.paginationValues.pageSize,
        {
          startDate,
          endDate,
          merchantName
        }
      );
    } else {
      response$ = this.reportsService.fetchBillingReports(
        this.merchantIdFromAdmin?? this.merchantId,
        this.paginationValues.pageIndex,
        this.paginationValues.pageSize,
        {
          startDate,
          endDate
        }
      );
    }

    this.count$ = response$.pipe(map((res) => res.recordsTotal));

    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    // Store filter values in this component
    this.filterValues = filters;
    this.paginationValues.pageIndex =
      +this.route.snapshot.queryParamMap.get("pageIndex") || 0;
    this.paginationValues.currentPage =
      +this.route.snapshot.queryParamMap.get("currentPage") || 1;
    this.getBillings();
  }

  setPager(paginationValues) {
    // Store pagination values in this component
    this.paginationValues = paginationValues;
    this.getBillings();
  }

  generateCsv() {
    if (this.storageService.isGaAdmin() && !this.merchantIdFromAdmin ) {
      this.adminEndpointTable();
    } else {
      this.nonAdminEndpointTable();
    }
  }

  adminEndpointTable() {
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));
    const { startDate, endDate, merchantName } = this.filterValues;

    this.subscriptions.push(
      this.reportsService
        .fetchAdminBillingReports(0, count, {
          startDate,
          endDate,
          merchantName
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                subscriptionName,
                createdOn,
                amount,
                paymentStatus,
              } = el;

              const dump = {
                subscriptionName,
                createdOn,
                amount,
                paymentStatus,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Billing report",
            this.downloadCSvheaders
          );
        })
    );
  }

  nonAdminEndpointTable() {
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));
    const { startDate, endDate } = this.filterValues;

    this.subscriptions.push(
      this.reportsService
        .fetchBillingReports(
          this.merchantIdFromAdmin?? this.merchantId,
          0, count, {
          startDate,
          endDate
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                merchant,
                subscriptionName,
                createdOn,
                paymentDate,
                reference,
                amount,
                paymentStatus,
              } = el;

              const dump = {
                merchant,
                subscriptionName,
                createdOn,
                paymentDate,
                reference,
                amount,
                paymentStatus,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Billing report",
            this.downloadCSvheaders
          );
        })
    );
  }
}
