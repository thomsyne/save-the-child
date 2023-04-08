import { Injectable } from "@angular/core";

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { Config, StorageService, TokenService } from "..";
import { environment } from "src/environments/environment.dev";

const ACCESS_CONTROL = environment.ACCESS_CONTROL_BTOA;
const BASE_URL_PGS = environment.BASE_URL_PGS;
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  isDownloadEndpoint: boolean =  false;
  constructor(
    private config: Config,
    private storageService: StorageService,
    private tokenService: TokenService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();

    const getAccessControlTokenEndpoint = [this.config.getXToken];

    const adminLoginEndpoint = [this.config.gaAdminLogin];

    const pgsAuthenticatedEndpoints = [
      this.config.documentService,
      this.config.auditService,
    ];

    const noAuthenticationEndpoints = [
      this.config.storeAdminLogin,
      this.config.onboardingCatlog,
      this.config.onboardMerchant,
      this.config.sendOTP,
      this.config.getEntitiesList,
      this.config.completeUserReg
    ];

    const noAuthEndpointswithID = [
      this.config.getSingleEntity,
      this.config.getBanksList
    ]

    const accountLookUpEndpoint = [environment.ACCOUNT_LOOKUP_ENDPOINT];

    const uploadEndpoints = [
      this.config.productBulkUpload,
      this.config.documentUpload,
      this.config.publicDocumentUpload,
      this.config.multipleImageUpload,
      this.config.manualCardSettlement
    ];

    const noAuthUploadEndpoints = [
      this.config.publicV2DocumentUpload
    ]

    const downloadEndpoints = [
      this.config.getUploadedFile
    ]

    // debugger;
    if (
      getAccessControlTokenEndpoint.includes(req.url.slice(BASE_URL_PGS.length))
    ) {
      headers = headers.append("Content-Type", "application/json");
      headers = headers.append("Accept", "application/json");
      headers = headers.append("Authorization", `Basic ${ACCESS_CONTROL}`);
    } else if (adminLoginEndpoint.includes(req.url.slice(BASE_URL.length))) {
      const { accessToken, validTill } = this.storageService.getXToken();

      headers = new HttpHeaders({
        "Content-Type": "application/json",
        Signature: this.tokenService
          .computeSignature(
            req.method,
            req.urlWithParams.split(BASE_URL).join().replace(/,/g, "")
          )
          .toString(),
        X_TOKEN: accessToken,
        Timestamp: validTill.toString(),
        Nonce: environment.NONCE,
      });
    } else if (
      pgsAuthenticatedEndpoints.includes(
        req.url.slice(BASE_URL_PGS.length).substring(0, 29)
      ) // to accommodate audit service url
    ) {
      const { accessToken, validTill } = this.storageService.getXToken();

      headers = new HttpHeaders({
        "Content-Type": "application/json",
        Signature: this.tokenService
          .computeSignature(
            req.method,
            req.urlWithParams.split(BASE_URL_PGS).join().replace(/,/g, "")
          )
          .toString(),
        X_TOKEN: accessToken,
        Timestamp: validTill.toString(),
        Nonce: environment.NONCE,
      });
    } else if (uploadEndpoints.includes(req.url.slice(BASE_URL.length))) {
      const jwtToken = this.storageService.getLoggedInUser().jsonWebToken;
      headers = new HttpHeaders({
        Authorization: "Bearer " + jwtToken.accessToken,
      });
    }
     else if (noAuthUploadEndpoints.includes(req.url.slice(BASE_URL.length))){
      null;
     }

    else if (
      noAuthenticationEndpoints.includes(req.url.slice(BASE_URL.length))
    ) {
      headers = headers.append("Content-Type", "application/json");
    } else if (
      accountLookUpEndpoint.includes(
        req.url.slice(environment.ACCOUNT_LOOKUP_BASE_URL.length)
      )
    ) {
      headers = headers.append("Content-Type", "application/json");
    }
    else if (req.url.slice(environment.BASE_URL.length).includes(downloadEndpoints.toString())){
      this.isDownloadEndpoint = true
      headers = headers.append("Content-Type", "image/png")
    }
    else if (noAuthEndpointswithID.includes(req.url.slice(BASE_URL.length).substring(0, req.url.slice(BASE_URL.length).lastIndexOf("/")))){
      headers = headers.append("Content-Type", "application/json");
    }
    else {
      const jwtToken = this.storageService.getLoggedInUser().jsonWebToken;
      headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken.accessToken,
      });
    }

    let clone = req.clone({
      headers,
    });

    if (req.url.slice(environment.BASE_URL.length).includes(downloadEndpoints.toString()) && this.isDownloadEndpoint){
      clone = req.clone({
        headers,
        responseType: 'arraybuffer'
      });
      this.isDownloadEndpoint = false;
    }

    return next.handle(clone);
  }
}
