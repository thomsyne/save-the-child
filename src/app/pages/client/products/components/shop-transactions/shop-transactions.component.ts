import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent, DateService } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { map } from 'rxjs/operators';
import { SalesReport } from 'src/app/pages/shared/reports/model';
import { ShopsService } from '../../../shops/services/shops.service';
import { shopTransactionsTableSettings, filters, downloadCSvheaders } from './shops-transactons.constants';


@Component({
  selector: 'app-shop-transactions',
  templateUrl: './shop-transactions.component.html',
  styleUrls: ['./shop-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopTransactionsComponent extends BaseTableComponent implements OnInit {

  shopId: number;
  transaction: SalesReport;
  showTransactionModal: boolean;

  constructor(
    paginationService: PaginationService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private shopsService: ShopsService,
    private dateService: DateService,
    private fileService: FileGenerationService
  ) {
    super(paginationService);
    this.tableSettings = shopTransactionsTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.getSelectedTransactionDetail(id);
        },
      },
    ];
    // this.filters[3].defaultValue = this.dateService.formatStartDate(this.filters[3].defaultValue);
    // this.filters[4].defaultValue = this.dateService.formatEndDate(this.filters[4].defaultValue);
  }

  ngOnInit(): void {
    this.shopId = this.route.snapshot.parent.params["id"];
  }

  toggleTransactionModal() {
    this.showTransactionModal = !this.showTransactionModal;
  }

  getSelectedTransactionDetail(transactionId: number) {
    this.tableData$.subscribe(transactions => {
      this.transaction = transactions.find(trans => trans.id === transactionId);
      this.toggleTransactionModal();
    });
  }

  getShopTransactions() {
    const { orderNumber, paymentType, paymentStatus, startDate, endDate } = this.filterValues;

    if (startDate > new Date() || (endDate && startDate > endDate)) {
      return this.alertService.info("Invalid Start Date");
    }

    const response$ = this.shopsService.fetchShopTransactions(
      this.shopId,
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        endDate,
        startDate,
        orderNumber,
        paymentType,
        paymentStatus,
      }
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex = 0;
    this.paginationValues.currentPage = 1;
    this.getShopTransactions();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getShopTransactions();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { orderNumber, paymentType, paymentStatus, startDate, endDate } = this.filterValues;

    this.subscriptions.push(
      this.shopsService
        .fetchShopTransactions(this.shopId, 0, count, {
          endDate,
          startDate,
          orderNumber,
          paymentType,
          paymentStatus,
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                orderNumber,
                orderDate,
                transactionReference,
                paymentMethod,
                soldBy,
                discount,
                totalAmount
              } = el;

              const dump = {
                orderNumber,
                orderDate,
                transactionReference,
                paymentMethod,
                soldBy,
                discount,
                totalAmount
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Shops Transactions",
            this.downloadCSvheaders
          );
        })
    );
  }
}
