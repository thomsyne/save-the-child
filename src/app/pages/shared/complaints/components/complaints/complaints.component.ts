import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent, DateService, StorageService } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { map } from 'rxjs/operators';
import { ComplaintsService } from '../../services/complaints.service';
import { filters, downloadCSvheaders, complaintsTableSettings } from './complaints.constants';

@Component({
  selector: 'app-support',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintsComponent extends BaseTableComponent implements OnInit {

  showCreateComplaintModal: boolean;
  isUserAdmin = false;

  constructor(
    paginationService: PaginationService,
    private router: Router,
    private complaintsService: ComplaintsService,
    private alertService: AlertService,
    private dateService: DateService,
    private fileService: FileGenerationService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {
    super(paginationService);
    this.tableSettings = complaintsTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`support/${id}/details`], {
            queryParams: {
              reference: this.filterValues.reference,
              category: this.filterValues.category,
              status: this.filterValues.status,
              startDate: this.filterValues.startDate,
              endDate: this.filterValues.endDate,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
            }
          });
        },
      },
    ];
    // this.filters[3].defaultValue = this.dateService.formatStartDate(this.filters[3].defaultValue);
    // this.filters[4].defaultValue = this.dateService.formatEndDate(this.filters[4].defaultValue);
  }

  ngOnInit(): void {
    this.isUserAdmin = this.storageService.isGaAdmin();
  }
  toggleCreateComplaintModal() {
    this.showCreateComplaintModal = !this.showCreateComplaintModal;
  }
  getComplaints() {
    const { reference, category, status, startDate, endDate } = this.filterValues;

    if (startDate > new Date() || (endDate && startDate > endDate)) {
      return this.alertService.info("Invalid Start Date");
      return;
    }

    const response$ = this.complaintsService.fetchComplaints(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        reference,
        category,
        status,
        startDate,
        endDate
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
    this.getComplaints();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getComplaints();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { reference, category, status, startDate, endDate } = this.filterValues;

    this.subscriptions.push(
      this.complaintsService
        .fetchComplaints(0, count, {
          reference,
          category,
          status,
          startDate,
          endDate
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                reference,
                status,
                category,
                createdOn,
                createdBy,
                updatedOn,
              } = el;

              const dump = {
                reference,
                status,
                category,
                createdOn,
                createdBy,
                updatedOn,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "support",
            this.downloadCSvheaders
          );
        })
    );
  }
}
