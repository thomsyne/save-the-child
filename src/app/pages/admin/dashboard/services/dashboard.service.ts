import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Config } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { MerchantDash, Subscriptions } from "../model";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class AdminDashboardService {
  constructor(private httpClient: HttpClient, private config: Config) {}

  fetchSubscriptions(): Observable<Subscriptions> {
    return this.httpClient
      .get<Subscriptions>(`${BASE_URL}${this.config.subscriptionsDashboard}`)
      .pipe(shareReplay());
  }

  fetchMerchantDash(): Observable<MerchantDash> {
    return this.httpClient
      .get<MerchantDash>(`${BASE_URL}${this.config.merchantDashboard}`)
      .pipe(shareReplay());
  }
}
