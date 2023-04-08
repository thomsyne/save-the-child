import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTableComponent, StorageService } from '@ga/core';
import { PaginationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { map } from 'rxjs/operators';
import { StaffsService } from '../../services/staff.service';
import { managementTableSettings, filters, downloadCSvheaders } from './observe-staff.constants';

@Component({
  selector: 'app-observe-staff',
  templateUrl: './observe-staff.component.html',
  styleUrls: ['./observe-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObserveStaffComponent extends BaseTableComponent implements OnInit {

  currentStore: string;
  constructor(
    paginationService: PaginationService,
    private router: Router,
    private alertService: AlertService,
    private staffService: StaffsService,
    private storageService: StorageService
  ) {
    super(paginationService);
    this.tableSettings = managementTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`products/${id}`]);
        },
      },
    ];
  }

  ngOnInit(): void {
    const merchantCode = this.storageService.getLoggedInUser().userDetails.merchant.code;
    this.currentStore = `REXRETAIL_${merchantCode}`;
  }

  getStaffLogs() {
    const { phone, startDate, endDate } = this.filterValues;

    if (startDate > new Date() || (endDate && startDate > endDate)) {
      return this.alertService.info("Invalid Start Date");
      return;
    }

    const response$ = this.staffService.fetchStaffLogs(
      this.currentStore,
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        phone,
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
    this.getStaffLogs();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getStaffLogs();
  }

}
