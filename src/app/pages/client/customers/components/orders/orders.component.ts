import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent, DateService } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Customer, CustomerOrder } from '../../model';
import { CustomerService } from '../../services/customers.service';
import { downloadCSvheaders, filters, orderTableSettings } from './orders.constants';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent extends BaseTableComponent implements OnInit, OnDestroy {
  customerId: number;
  customer: Customer;
  selectedCustomerOrder: CustomerOrder;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    paginationService: PaginationService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private dateService: DateService,
    private alertService: AlertService,
    private fileService: FileGenerationService,
    private ref: ChangeDetectorRef,
  ) {
    super(paginationService);
    this.tableSettings = orderTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "View Order",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.getSingleCustomerOrder(id);
        },
      },
    ];
    // this.filters[3].defaultValue = this.dateService.formatStartDate(this.filters[3].defaultValue);
    // this.filters[4].defaultValue = this.dateService.formatEndDate(this.filters[4].defaultValue);
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    this.customerService
      .fetchSingleCustomer(this.customerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((cus) => {
        this.customer = cus
        this.ref.markForCheck();
      })
  }

  getSingleCustomerOrder(id: number) {
    this.customerService.fetchSingleOrderDetail(id).subscribe((res) => {
      this.selectedCustomerOrder = res;
      this.ref.markForCheck();
    });
  }

  getCustomerOrders() {
    const { orderNumber, paymentStatus, paymentType, startDate, endDate } = this.filterValues;
    const response$ = this.customerService.fetchCustomerOrders(
      this.customerId,
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        orderNumber, paymentStatus, paymentType, startDate, endDate
      }
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex = 0;
    this.paginationValues.currentPage = 1;
    this.getCustomerOrders();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getCustomerOrders();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { orderNumber, paymentStatus, paymentType, startDate, endDate } = this.filterValues;

    this.subscriptions.push(
      this.customerService
        .fetchCustomerOrders(
          this.customerId,
          0,
          count,
          {
            orderNumber, paymentStatus, paymentType, startDate, endDate
          }
        )
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                id,
                device,
                orderNumber,
                soldBy,
                totalQuantity,
                totalAmount,
                paymentMethod,
                currency,
                customer,
                orderDate,
                store,
                paymentStatus,
                discount,
                discountType,
                maskedCardNumber,
                cardHolderName,
                stan,
                authCode,
                retrievalRefNumber,
                responseCode,
                responseDescription
              } = el;

              const dump = {
                id,
                device,
                orderNumber,
                soldBy,
                totalQuantity,
                totalAmount,
                paymentMethod,
                currency,
                customer,
                orderDate,
                store,
                paymentStatus,
                discount,
                discountType,
                maskedCardNumber,
                cardHolderName,
                stan,
                authCode,
                retrievalRefNumber,
                responseCode,
                responseDescription
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Orders",
            this.downloadCSvheaders
          );
        })
    );
  }


  toggleCustomerActiveState() {
    const { isActive, mobileNumber, email, fullName, id, receiveEReceipt } = this.customer;

    const countryCode = mobileNumber.substring(0, 4);
    const phoneNumber = mobileNumber.substring(4);

    const payload = {
      countryCode,
      mobileNumber: phoneNumber,
      email,
      fullName,
      receiveEReceipt,
      id,
      isActive: !isActive,
    };

    this.customerService.updateCustomer(this.customerId, payload).subscribe({
      next: (res) => {
        this.alertService.success("Customer updated successfully");
        this.getCustomerDetails();
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
