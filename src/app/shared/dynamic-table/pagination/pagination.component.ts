import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from "@angular/core";
import { PaginationService } from "../pagination.service";
import { LabelledDropdownParameters } from "@ga/utility";
import {
  pageSizeDropdownParameters,
  PaginationType,
} from "./pagination.contants";
import { Subscription } from "rxjs";

@Component({
  selector: "lib-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnDestroy, OnChanges {
  @Input() totalElements: number;
  @Input() pageIndex: number;
  @Input() currentPage: number;
  @Input() paginationType: PaginationType;

  @Input() onlyPages = false;

  pager: any;

  @Output() pageChange = new EventEmitter<{
    pageSize: number;
    pageIndex: number;
    currentPage: number;
    paginationType?: PaginationType;
  }>();

  pageSizeDropdownParameters: LabelledDropdownParameters =
    pageSizeDropdownParameters;

  pageSize: number = this.pageSizeDropdownParameters.items[0].value;

  // Subscriptions handler
  subscriptions: Subscription[] = [];

  constructor(private paginationService: PaginationService) {}

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    this.subscriptions.push(
      this.paginationService.pageSize$.subscribe((size) => {
        this.pageSizeDropdownParameters.current = size;
        this.pageSize = size;
      })
    );

    if (changes["totalElements"]) {
      this.pager = this.paginationService.getPager(
        this.totalElements || 0,
        this.currentPage || 1,
        this.pageSizeDropdownParameters.current
      );
    }
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.pageIndex = 0;

    this.paginationService.setPageSize(size);

    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      paginationType: this.paginationType,
    });
  }

  getPage(page) {
    if (+page === this.currentPage) return;

    this.pageIndex = (page - 1) * 1; //this.pageSize;
    this.currentPage = page;

    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      currentPage: this.currentPage,
    });
  }

  previousPage() {
    this.pageIndex = +this.pageIndex - 1; //this.pageSize;
    this.currentPage--;

    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      paginationType: this.paginationType,
    });
  }

  nextPage() {
    this.pageIndex = +this.pageIndex + 1; // this.pageSize;
    this.currentPage++;

    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      paginationType: this.paginationType,
    });
  }
}
