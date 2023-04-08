import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment.dev";
import { Config, OnboardMerchant } from "..";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class OnboardingService {
  constructor(private httpClient: HttpClient, private config: Config) {}

  // TODO: Add return types
  getOnboardingCatlog() {
    return this.httpClient.get(`${BASE_URL}${this.config.onboardingCatlog}`);
  }

  onboardMerchant(merchant: Partial<OnboardMerchant>) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.onboardMerchant}`,
      merchant
    );
  }
}
