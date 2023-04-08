import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { map } from 'rxjs/operators';
import { CustomerService } from '../../services/customers.service';
import {
  customersTableSettings,
  filters,
  downloadCSvheaders
} from './all-customers.constants';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCustomersComponent extends BaseTableComponent implements OnInit {
  showCreateCustomerModal = false;
  showEditCustomerModal = false;
  customerId: number = 0;
  constructor(
    paginationService: PaginationService,
    private customerService: CustomerService,
    private router: Router,
    private fileService: FileGenerationService,
    private route: ActivatedRoute
  ) {
    super(paginationService);
    this.tableSettings = customersTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`customers/${id}/orders`], {
            queryParams: {
              fullName: this.filterValues.fullName,
              email: this.filterValues.email,
              phoneNumber: this.filterValues.phoneNumber,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
            },
          });
        },
      },
      {
        title: "Update",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.customerId = id
          this.toggleEditCustomerModal()
        },
      },
    ];
  }

  ngOnInit(): void {

  }

  toggleCreateCustomerModal() {
    this.showCreateCustomerModal = !this.showCreateCustomerModal;
  }

  toggleEditCustomerModal() {
    this.showEditCustomerModal = !this.showEditCustomerModal;
  }

  getCustomers() {
    const { fullName, email, phoneNumber } = this.filterValues;
    const response$ = this.customerService.fetchAllCustomers(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        fullName, email, phoneNumber
      }
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
    this.getCustomers();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getCustomers();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { fullName, email, phoneNumber } = this.filterValues;

    this.subscriptions.push(
      this.customerService
        .fetchAllCustomers(0, count, {
          fullName, email, phoneNumber
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                id,
                fullName,
                mobileNumber,
                email,
                isActive,
              } = el;

              const dump = {
                id,
                fullName,
                mobileNumber,
                email,
                isActive,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Customers",
            this.downloadCSvheaders
          );
        })
    );
  }
}
