import { countryCodes } from './../../../../../core/constants/constants';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseTableComponent, countries } from '@ga/core';
import { PaginationService, FileGenerationService } from '@ga/dynamic-table';
import { map } from 'rxjs/operators';
import { downloadCSvheaders } from '../../../subscriptions/components/subscriptions/subscriptions.constants';
import { BankService } from '../../services/bank.service';
import { bankTableSettings, filters } from './bank-list.constants';


@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankListComponent extends BaseTableComponent implements OnInit {

  constructor(
    paginationService: PaginationService,
    private readonly bankService: BankService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private fileService: FileGenerationService,
  ) {
    super(paginationService);
    this.tableSettings = bankTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["code"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (code) => {
          this.router.navigate([`banks/${code}`], {
            queryParams: {
              countryCode: this.filterValues.countryCode,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
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
    this.filters[0].options = new Map(countryCodes);
  }

  routeToCreate(){
    this.router.navigate(['/banks/create'])
  }

  getBanks() {
    const { countryCode } = this.filterValues;
    const response$ = this.bankService.fetchAllBanks(
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

    if (!filters.countryCode) filters.countryCode = '234'

    this.paginationValues.pageIndex =
      +this.route.snapshot.queryParamMap.get("pageIndex") || 0;
    this.paginationValues.currentPage =
      +this.route.snapshot.queryParamMap.get("currentPage") || 1;

    this.getBanks();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getBanks();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { countryCode } = this.filterValues;

    this.subscriptions.push(
      this.bankService
        .fetchAllBanks(0, count, {
          countryCode
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                name,
                code,
                otherCode,
                instantCode,
                countryCode,

              } = el;

              const dump = {
                name,
                code,
                otherCode,
                instantCode,
                countryCode
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Banks",
            this.downloadCSvheaders
          );
        })
    );
  }
}
