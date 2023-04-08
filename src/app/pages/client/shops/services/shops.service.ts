import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, DateService, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, shareReplay } from "rxjs/operators";
import { Shop, ShopInventory } from "../model";
import { SalesReport } from "src/app/pages/shared/reports";
import { Staff } from "src/app/pages/shared/my-staffs/model";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class ShopsService {

  private shopSource = new BehaviorSubject<Shop>(null);
  currentShop = this.shopSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private config: Config,
    private dateService: DateService
  ) {}

  changeShop(shop: Shop) {
    this.shopSource.next(shop);
  }

  createStore(shopData: Partial<Shop>) {
    return this.httpClient.post(`${BASE_URL}${this.config.store}`, shopData);
  }

  fetchAllShops(
    offset: number,
    limit: number,
    options?: {
      name: any;
      systemName: any;
    }
  ): Observable<TableDataResponse<Shop>> {
    let params = new HttpParams();
    if (options.name) params = params.append("name", options.name);

    if (options.systemName) params = params.append("systemName", options.systemName);

    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);

    return this.httpClient.get<TableDataResponse<Shop>>(
      `${BASE_URL}${this.config.getAllShops}`, { params }
    ).pipe(
      catchError(() => of({data: []} as TableDataResponse<Shop>)),
      shareReplay()
    )
  }

  fetchShopInventory(
    shopId: number,
    offset: number,
    limit: number,
    options?: {
      name: string;
      code: string;
      category: string;
      startExpiryDate: string;
      endExpiryDate: string;
    }
  ): Observable<TableDataResponse<ShopInventory>> {
    let params = new HttpParams();
    if (options.name) params = params.append("name", options.name);
    if (options.code) params = params.append("code", options.code);
    if (options.category) params = params.append("category", options.category);
    if (options.startExpiryDate) params = params.append(
      "startExpiryDate", this.dateService.formatStartDate(options.startExpiryDate)
    );
    if (options.endExpiryDate) params = params.append("endExpiryDate", this.dateService.formatEndDate(options.endExpiryDate));

    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);

    return this.httpClient.get<TableDataResponse<ShopInventory>>(
      `${BASE_URL}${this.config.getShopInventory}/${shopId}/inventory`, { params }
    ).pipe(
      catchError(() => of({data: []} as TableDataResponse<ShopInventory>)),
      shareReplay()
    )
  }

  fetchShopTransactions(
    shopId: number,
    offset: number,
    limit: number,
    options?: {
      orderNumber: string;
      paymentType: string;
      paymentStatus: string;
      startDate: string;
      endDate: string;
    }
  ): Observable<TableDataResponse<SalesReport>> {
    let params = new HttpParams();
    if (options.orderNumber) params = params.append("orderNumber", options.orderNumber);
    if (options.paymentType) params = params.append("paymentType", options.paymentType);
    if (options.paymentStatus) params = params.append("paymentStatus", options.paymentStatus);
    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append("endDate", this.dateService.formatEndDate(options.endDate));

    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);

    return this.httpClient.get<TableDataResponse<SalesReport>>(
      `${BASE_URL}${this.config.getShopTransactions}/${shopId}/orders`, { params }
    ).pipe(
      catchError(() => of({data: []} as TableDataResponse<SalesReport>)),
      shareReplay()
    )
  }

  fetchSingleShop(shopId: number): Observable<Shop> {
    return this.httpClient.get<Shop>(
      `${BASE_URL}${this.config.getShopTransactions}/${shopId}`
    ).pipe(shareReplay())
  }

  updateShop(shopId:number, payload: Partial<Shop>): Observable<Shop> {
    return this.httpClient.put<Shop>(
      `${BASE_URL}${this.config.getShopTransactions}/${shopId}`, payload
    ).pipe(shareReplay())
  }

  fetchCashiers(shopId: number): Observable<Staff[]> {
    return this.httpClient.get<TableDataResponse<Staff>>(
      `${BASE_URL}${this.config.getShopTransactions}/${shopId}/users`
    ).pipe(
      map(res => res.data),
      shareReplay()
    )
  }

  printReceipt(id: number) {
    const httpOptions = {
      responseType: "arraybuffer" as "json",
    };
    return this.httpClient.get(
      `${BASE_URL}${this.config.getOrderData}/${id}/download`,
      httpOptions
    );
  }

}
