import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { StaffsService } from '../../services/staff.service';
import { permissionsTableSettings, filters, downloadCSvheaders } from './permissions.constants';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsComponent extends BaseTableComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  title: string = '';
  constructor(
    paginationService: PaginationService,
    private router: Router,
    private staffsService: StaffsService,
    private fileService: FileGenerationService,
    private route: ActivatedRoute,
  ) {
    super(paginationService);
    this.tableSettings = permissionsTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Update",
        params: ["name"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (name) => {
          this.router.navigate([`staff/permissions/${name}/update-role`], {
            queryParams: {
              Name: this.filterValues.Name,
              Category: this.filterValues.Category,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
            },
          });
        },
      },
    ];
  }

  ngOnInit(): void {
    this.staffsService.currentComponentTitle
    .pipe(takeUntil(this.destroy$))
    .subscribe(componentTitle => {
      this.title = componentTitle;
    })
  }

  getRoles() {
    const { Name, Category } = this.filterValues;
    const response$ = this.staffsService.fetchStaffRoles(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        Name,
        Category
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
    this.getRoles();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getRoles();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { Name, Category } = this.filterValues;

    this.subscriptions.push(
      this.staffsService
        .fetchStaffRoles(0, count, {
          Name,
          Category
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                name,
                category,
                active
              } = el;

              const dump = {
                name,
                category,
                active
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Users Roles",
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
