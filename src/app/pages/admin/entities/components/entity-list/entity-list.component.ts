import { EntityService } from './../../services/entity.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent, countries } from '@ga/core';
import { downloadCSvheaders, entityTableSettings, filters } from './entity-list.constants';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityListComponent extends BaseTableComponent implements OnInit {

  constructor(
    paginationService: PaginationService,
    private readonly entityService: EntityService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fileService: FileGenerationService,
  ) {
    super(paginationService);
    this.tableSettings = entityTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["code"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (code) => {
          this.router.navigate([`entities/${code}/profile`], {
            // queryParams: {
            //   code
            // },
          });
        },
      },
      {
        title: "View Orders",
        params: ["code", "name"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (code, name) => {
          this.router.navigate([`entities/${code}/orders`], {
            queryParams: {
              name
            },
          });
        },
      },
    ];
   }

  ngOnInit() {
    this.initFilters()
  }

  initFilters(){
    this.filters[0].options = new Map(countries);
  }

  routeToCreate(){
    this.router.navigate(['/entities/create'])
  }

  getEntities() {
    const { countryCode } = this.filterValues;
    const response$ = this.entityService.fetchAllEntities(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        countryCode
      }
    );

    this.count$ = response$.pipe(map((res) => res.data.length));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    this.filterValues = filters;

    this.paginationValues.pageIndex =
      +this.route.snapshot.queryParamMap.get("pageIndex") || 0;
    this.paginationValues.currentPage =
      +this.route.snapshot.queryParamMap.get("currentPage") || 1;

    this.getEntities();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getEntities();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { countryCode } = this.filterValues;

    this.subscriptions.push(
      this.entityService
        .fetchAllEntities(0, count, {
          countryCode
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                name,
                code,
                baseWebUrl,
                countryCode,
                status,
                subscriptionAllow,
                settlementBankCode,
                settlementAccount,
                provider,
                settlementBank,
                settlementType,
                isActive,
              } = el;

              const dump = {
                name,
                code,
                baseWebUrl,
                countryCode,
                status,
                subscriptionAllow,
                settlementBankCode,
                settlementAccount,
                provider,
                settlementBank,
                settlementType,
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
