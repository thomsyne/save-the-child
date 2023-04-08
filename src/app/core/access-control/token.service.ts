import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.dev";
import * as cryptoJS from "crypto-js";
import { StorageService } from "../services/storage.service";
import { HttpClient } from "@angular/common/http";
import { Config } from "../constants/endpoints";
import { Observable } from "rxjs";
import { XTokenResponse } from "..";
import { tap } from "rxjs/operators";

const BASE_URL_PGS = environment.BASE_URL_PGS;

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient,
    private config: Config
  ) {}

  // Get Access control details
  getXToken(): Observable<XTokenResponse> {
    return this.httpClient
      .post<XTokenResponse>(`${BASE_URL_PGS}${this.config.getXToken}`, {
        durtion: 12000,
      })
      .pipe(
        tap((res) => {
          this.storageService.storeXToken(res);
        })
      );
  }

  computeSignature(httpMethod: string, encodedUrl: string) {
    const { accessToken, accessSecret, validTill } =
      this.storageService.getXToken();

    const timestamp: string = validTill.toString();
    const nonce: string = environment.NONCE;

    return cryptoJS
      .SHA512(
        `${accessToken}&&${accessSecret}&&${timestamp}&&${nonce}&&${httpMethod}&&${encodeURIComponent(
          encodedUrl
        )}`
      )
      .toString();
  }
}
