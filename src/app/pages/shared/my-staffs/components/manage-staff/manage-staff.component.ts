import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent, StorageService } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Staff } from '../../model';
import { StaffsService } from '../../services/staff.service';
import { manageUsersTableSettings, filters, downloadCSvheaders } from './manage-staff.constants';


@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageStaffComponent extends BaseTableComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  title: string = '';
  showCreateStaffModal = false;
  constructor(
    paginationService: PaginationService,
    private router: Router,
    private staffsService: StaffsService,
    private fileService: FileGenerationService,
    private route: ActivatedRoute
  ) {
    super(paginationService);
    this.tableSettings = manageUsersTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`staff/${id}/edit`], {
            queryParams: {
              firstName: this.filterValues.firstName,
              lastName: this.filterValues.lastName,
              UserRole: this.filterValues.UserRole,
              Email: this.filterValues.Email,
              code: this.filterValues.code,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
            }
          });
        },
        // condition: () => {
        //   console.log('condi')
        // }
      },
    ];
  }

  ngOnInit(): void {
    this.staffsService.currentComponentTitle
    .pipe(takeUntil(this.destroy$))
    .subscribe(componentTitle => {
      this.title = componentTitle;
    });
  }

  toggleCreateStaffModal() {
    this.showCreateStaffModal = !this.showCreateStaffModal;
  }
  getProducts() {
    const { firstName, lastName, Email, UserRole, code } = this.filterValues;

    const response$ = this.staffsService.fetchAllStaff(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        firstName,
        lastName,
        Email,
        UserRole,
        code
      }
    );

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

    this.getProducts();
  }

  setPager(paginationValues) {
    // Store pagination values in this component
    this.paginationValues = paginationValues;

    this.getProducts();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { firstName, lastName, Email, UserRole, code } = this.filterValues;

    this.subscriptions.push(
      this.staffsService
        .fetchAllStaff(0, count, {
          firstName,
          lastName,
          Email,
          UserRole,
          code
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                firstName,
                lastName,
                phoneNumber,
                email,
                username,
                currentStore,
                userRole,
                active,
              } = el;

              const dump = {
                firstName,
                lastName,
                phoneNumber,
                email,
                username,
                currentStore,
                userRole,
                active,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Users",
            this.downloadCSvheaders
          );
        })
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
