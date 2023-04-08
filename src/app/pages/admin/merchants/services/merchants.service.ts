import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";
import { Merchant, OTPPayload } from "../model";
import { Shop } from "src/app/pages/client/shops/model";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class MerchantsService {

  private merchantSource = new BehaviorSubject<Merchant>(null);
  currentMerchant = this.merchantSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private config: Config
  ) {}

  changeMerchant(merchant: Merchant) {
    this.merchantSource.next(merchant);
  }

  getMerchants(){
    let params = new HttpParams();
    params = params.append("pageSize", "3000");
    return this.httpClient
      .get(`${BASE_URL}${this.config.getMerchants}`, { params })
  }

  addMerchant(merchantDetails: Partial<Merchant>) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.getSingleMerchant}`,
      merchantDetails
    );
  }

  fetchMerchants(
    offset: number,
    limit: number,
    options?: {
      name: string;
      code: string;
      subscriptionPlan: string;
      subscriptionType: string;
      pendingValidation: string;
    }
  ): Observable<TableDataResponse<Merchant>> {
    let params = new HttpParams();
    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);
    if (options) {
      if (options.name) params = params.append("name", options.name);
      if (options.code) params = params.append("code", options.code);
      if (options.subscriptionPlan) params = params.append("subscriptionPlan", options.subscriptionPlan);
      if (options.subscriptionType) params = params.append("subscriptionType", options.subscriptionType);
      if (options.pendingValidation) {
        if (options.pendingValidation === 'validated') {
          params = params.append("pendingValidation", false);
        } else {
          params = params.append("pendingValidation", true);
        }
      }
    }

    return this.httpClient.get<TableDataResponse<Merchant>>(
      `${BASE_URL}${this.config.getMerchants}`, { params }
    ).pipe(
      catchError(() => of({data: []} as TableDataResponse<Merchant>)),
      shareReplay()
    )
  }

  fetchSingleMerchant(merchantId: number): Observable<Merchant> {
    return this.httpClient
    .get<Merchant>(`${BASE_URL}${this.config.getSingleMerchant}/${merchantId}`)
    .pipe(shareReplay())
  }

  fetchMerchantStores(merchantId: number): Observable<TableDataResponse<Shop>> {
    let params = new HttpParams();
    params = params.append("pageSize", 1000);

    return this.httpClient
    .get<TableDataResponse<Shop>>(`${BASE_URL}${this.config.getSingleMerchant}/${merchantId}/stores`, {params})
    .pipe(
      catchError(() => of({data: []} as TableDataResponse<Shop>)),
      shareReplay()
    )
  }

  updateMerchantSubPlan(merchantId, subscriptionPlan) {
    // /api/accelerex-ecr/merchant-management/v1/merchants/444/changeSubscriptionPlan
    return this.httpClient.put(
      `${BASE_URL}${this.config.getSingleMerchant}/${merchantId}/changeSubscriptionPlan`,
      {merchantId, subscriptionPlan}
    );
  }

  updateSingleMerchant(merchantId, payload: Partial<Merchant>) {
    return this.httpClient.put(
      `${BASE_URL}${this.config.getSingleMerchant}/${merchantId}`,
      payload
    );
  }

  generateOTPCode(payload: {process: string, userId: any}): Observable<OTPPayload> {
    return this.httpClient.post<OTPPayload>(
      `${BASE_URL}${this.config.generateOTP}`, payload
    );
  }

  changeMerchantPin(payload) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.changePin}`, payload
    );
  }

  resetAnpPin(merchantId: number) {
    return this.httpClient.post(`${BASE_URL}${this.config.resetAnpPin}`, {
      merchantId,
    });
  }

  resetAnpPassword(merchantId: number) {
    return this.httpClient.post(`${BASE_URL}${this.config.resetAnpPassword}`, {
      merchantId,
    });
  }

  activateLeaseMerchant(merchantId: number) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.activateLeaseMerchant}`,
      {
        Approve: true,
        MerchantId: merchantId,
      }
    );
  }

}
