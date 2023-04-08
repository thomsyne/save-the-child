import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Product, Stock } from "../model";
import { Observable, of } from "rxjs";
import { catchError, shareReplay, tap } from "rxjs/operators";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  constructor(private httpClient: HttpClient, private config: Config) { }

  getInventories(
    offset: number,
    limit: number,
  ): Observable<TableDataResponse<Product>> {
    let params = new HttpParams();

    if (limit) params = params.append("pageSize", limit);
    if (offset) params = params.append("pageIndex", offset);

    return this.httpClient
      .get<TableDataResponse<Product>>(
        `${BASE_URL}${this.config.inventories}`,
        {
          params,
        }
      )
      .pipe(
        tap(res => console.log(res)),
        catchError(() => of({ data: [] } as TableDataResponse<Product>)),
        shareReplay()
      );
  }

  getInventoryStock(productId: number): Observable<Stock[]>{
    return this.httpClient.get<Stock[]>(
      `${BASE_URL}${this.config.singleInventory}/${productId}`
    )
  }
}
