import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { PagerContent } from "./model";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PaginationService {
  constructor() {}

  private globalPageSize = new BehaviorSubject<number>(10);
  pageSize$ = this.globalPageSize.asObservable().pipe(shareReplay());

  setPageSize(size: number) {
    this.globalPageSize.next(size);
  }

  getPager(totalItems: number, currentPage: number, pageSize: number) {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;

    if (totalPages <= 12) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 8) {
        startPage = 1;
        endPage = 12;
      } else if (currentPage + 6 >= totalPages) {
        startPage = totalPages - 11;
        endPage = totalPages;
      } else {
        startPage = currentPage - 7;
        endPage = currentPage + 6;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }
}
