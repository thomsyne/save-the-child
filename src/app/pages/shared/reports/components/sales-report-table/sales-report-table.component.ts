import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent, DateService } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { map } from 'rxjs/operators';
import { ReportsService } from '../../services/reports.service';
import { salesReportsTableSettings, filters, downloadCSvheaders } from './sales-report.constants';

@Component({
  selector: 'app-sales-report-table',
  templateUrl: './sales-report-table.component.html',
  styleUrls: ['./sales-report-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesReportTableComponent extends BaseTableComponent implements OnInit {

  @Input() merchantId: number;
  constructor(
    paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    private reportsService: ReportsService,
    private alertService: AlertService,
    private dateService: DateService,
    private fileService: FileGenerationService
  ) {
    super(paginationService);
    this.tableSettings = salesReportsTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`reports/sales-details/${id}/details`], {
            queryParams: {
              orderNumber: this.filterValues.orderNumber,
              paymentStatus: this.filterValues.paymentStatus,
              paymentType: this.filterValues.paymentType,
              startDate: this.filterValues.startDate,
              endDate: this.filterValues.endDate,
              subscriptionPlan: this.filterValues.subscriptionPlan,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
            },
          });
        },
      },
    ];
    // this.filters[3].defaultValue = this.dateService.formatStartDate(this.filters[3].defaultValue);
    // this.filters[4].defaultValue = this.dateService.formatEndDate(this.filters[4].defaultValue);
  }

  ngOnInit(): void {
    console.log(this.merchantId)
  }

  getSalesReports() {
    const { orderNumber, paymentStatus, paymentType, startDate, endDate } = this.filterValues;

    if (startDate > new Date() || (endDate && startDate > endDate)) {
      return this.alertService.info("Invalid Start Date");
    }

    const response$ = this.reportsService.fetchSalesReports(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        orderNumber,
        paymentType,
        paymentStatus,
        startDate,
        endDate
      },
      this.merchantId,
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex =
      +this.route.snapshot.queryParamMap.get("pageIndex") || 0;
    this.paginationValues.currentPage =
      +this.route.snapshot.queryParamMap.get("currentPage") || 1;
    this.getSalesReports();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getSalesReports();
  }

  generateCsv() {
    this.alertService.warn('Please wait, your file is being prepared...')
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { orderNumber, paymentStatus, paymentType, startDate, endDate } = this.filterValues;

    this.subscriptions.push(
      this.reportsService
        .fetchSalesReports(0, count, {
          orderNumber,
          paymentType,
          paymentStatus,
          startDate,
          endDate
        },
        this.merchantId
        )
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              el.orderItems = el.orderItems.map((v) => v?.productName + ' x ' + v?.quantity)?.toString()
              const {
                orderNumber,
                orderItems,
                store,
                totalAmount,
                soldBy,
                createdOn,
                customer,
                paymentMethod,
                paymentStatus,
              } = el;

              this.alertService.warn('Please wait, your file is being prepared...')

              const dump = {
                orderNumber,
                orderItems,
                store,
                totalAmount,
                soldBy,
                createdOn,
                customer,
                paymentMethod,
                paymentStatus,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.alertService.success('Downloading...')
          this.fileService.generateCSV(
            res,
            "Merchant Sales Report",
            this.downloadCSvheaders
          );
        })
    );
  }

}
