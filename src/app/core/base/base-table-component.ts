import { Directive, OnDestroy } from "@angular/core";
import {
  ColumnSetting,
  IPagerContent,
  PaginationService,
} from "@ga/dynamic-table";
import { Observable, Subscription } from "rxjs";

@Directive()
export abstract class BaseTableComponent implements OnDestroy {
  // Filter
  filters;
  filterValues;

  // Pagination
  paginationValues: IPagerContent = {
    pageSize: 10,
    pageIndex: 0,
    currentPage: 1,
    paginationType: 0,
  };

  // Table data
  tableSettings: ColumnSetting[];
  tableData$;
  count$: Observable<number>;
  buttonSettings = [];

  // Download CSV headers
  downloadCSvheaders;

  // Subscriptions hanler
  subscriptions: Subscription[] = [];

  constructor(private paginationService: PaginationService) {
    this.subscriptions.push(
      this.paginationService.pageSize$.subscribe(
        (size) => (this.paginationValues.pageSize = size)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
