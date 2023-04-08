import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, DateService, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Observable, of } from "rxjs";
import { catchError, map, shareReplay } from "rxjs/operators";
import { DashboardCashier, DashboardCustomer, DashboardProduct, PaymentMethod } from "../model";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(
    private httpClient: HttpClient,
    private config: Config,
    private dateService: DateService,
    ) {}


  fetchTransaction(
    options?: {
      startDate: string;
      endDate: string;
    }
  ): Observable<PaymentMethod[]> {
    let params = new HttpParams();
    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );
    return this.httpClient.get<PaymentMethod[]>(
      `${BASE_URL}${this.config.transactions}`, {params}
    ).pipe(
      shareReplay()
    );
  }
  
  fetchTopProductByQty(
    options?: {
      startDate: string;
      endDate: string;
    }
  ): Observable<DashboardProduct[]> {
    let params = new HttpParams();
    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );
    return this.httpClient.get<TableDataResponse<DashboardProduct>>(
      `${BASE_URL}${this.config.topProductByQty}`, {params}
    ).pipe(map(res => res.data));
  }

  fetchTopProductByValue(
    options?: {
      startDate: string;
      endDate: string;
    }
  ): Observable<DashboardProduct[]> {
    let params = new HttpParams();
    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );
    return this.httpClient.get<TableDataResponse<DashboardProduct>>(
      `${BASE_URL}${this.config.topProductByValue}`, { params }
    ).pipe(
      map(res => res.data)
    )
  }

  fetchTopCustomers(
    options?: {
      startDate: string;
      endDate: string;
    }
  ): Observable<DashboardCustomer[]> {
    let params = new HttpParams();
    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );
    return this.httpClient.get<TableDataResponse<DashboardCustomer>>(
      `${BASE_URL}${this.config.topCustomer}`, {params}
    ).pipe(map(res => res.data))
  }

  fetchTopCashier(
    options?: {
      startDate: string;
      endDate: string;
    }
  ): Observable<DashboardCashier[]> {
    let params = new HttpParams();
    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );
    return this.httpClient.get<TableDataResponse<DashboardCashier>>(
      `${BASE_URL}${this.config.topCashier}`, {params}
    ).pipe(map(res => res.data))
  }

  fetchPaymentMethods(
    merchantId: number,
    options?: {
      startDate: string;
      endDate: string;
    }
  ): Observable<PaymentMethod[]> {
    let params = new HttpParams();
    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );
    return this.httpClient.get<PaymentMethod[]>(
      `${BASE_URL}${this.config.getSingleMerchant}/${merchantId}/paymentMethod`, {params}
    ).pipe(shareReplay())
  }

}
