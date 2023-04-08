import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Observable, of } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";
import { SubscriptionModel } from "../model";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class SubscriptionsService {
  constructor(
    private httpClient: HttpClient,
    private config: Config
  ) {}

  fetchAllSubscriptions(): Observable<SubscriptionModel[]> {
    return this.httpClient.get<SubscriptionModel[]>(
      `${BASE_URL}${this.config.allSubscriptions}`
    );
  }

  fetchSingleSubscription(subID): Observable<SubscriptionModel> {
    return this.httpClient.get<SubscriptionModel>(
      `${BASE_URL}${this.config.allSubscriptions}/${subID}`
    );
  }

  updateSingleSubscription(subID: number, payload: Partial<SubscriptionModel>): Observable<SubscriptionModel> {
    return this.httpClient.put<SubscriptionModel>(
      `${BASE_URL}${this.config.allSubscriptions}/${subID}`, payload
    );
  }

  createSubscription(subscriptionData: Partial<SubscriptionModel>) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.allSubscriptions}`,
      subscriptionData
    );
  }

  fetchSubscriptions(
    offset: number,
    limit: number,
    options: {
      name: string;
    }
  ): Observable<TableDataResponse<SubscriptionModel>> {
    let params = new HttpParams();
    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);
    if (options.name) params = params.append("name", options.name);

    return this.httpClient.get<TableDataResponse<SubscriptionModel>>(
      `${BASE_URL}${this.config.getSubscriptions}`, { params }
    ).pipe(
      catchError(() => of({data: []} as TableDataResponse<SubscriptionModel>)),
      shareReplay()
    )
  }

}