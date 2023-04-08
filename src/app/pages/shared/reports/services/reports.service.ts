import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, DateService, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { BillingReport, SalesReport, SettlementsReport, CashierReport, SettlementSummary, SettlementBalance, SubscriptionUpdate, CorporateEntityOrder } from "../model";
import { Observable, of } from "rxjs";
import { catchError, share, shareReplay } from "rxjs/operators";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class ReportsService {
  constructor(
    private httpClient: HttpClient,
    private config: Config,
    private dateService: DateService
  ) { }

  fetchBillingReports(
    merchantId: number,
    offset: number,
    limit: number,
    options: {
      startDate: any;
      endDate: any;
    }
  ): Observable<TableDataResponse<BillingReport>> {
    let params = new HttpParams();

    if (offset) params = params.append("pageIndex", offset);

    if (limit) params = params.append("pageSize", limit);

    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );

    return this.httpClient
      .get<TableDataResponse<BillingReport>>(
        `${BASE_URL}${this.config.getBillings}/${merchantId}/invoice`,
        { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<BillingReport>)),
        shareReplay()
      );
  }
  fetchAdminBillingReports(
    offset: number,
    limit: number,
    options: {
      startDate: any;
      endDate: any;
      merchantName: string
    }
  ): Observable<TableDataResponse<BillingReport>> {
    let params = new HttpParams();

    if (offset) params = params.append("pageIndex", offset);

    if (limit) params = params.append("pageSize", limit);

    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );
    if (options.merchantName) params = params.append(
      "merchantName", options.merchantName
    );

    return this.httpClient
      .get<TableDataResponse<BillingReport>>(
        `${BASE_URL}${this.config.getAdminBillings}/search`,
        { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<BillingReport>)),
        shareReplay()
      );
  }


  fetchSalesReports(
    offset: number,
    limit: number,
    options: {
      orderNumber: string,
      paymentStatus: string,
      paymentType: string,
      startDate: any;
      endDate: any;
    },
    merchantId: number,
  ): Observable<TableDataResponse<SalesReport>> {
    let params = new HttpParams();

    if (offset) params = params.append("pageIndex", offset);

    if (limit) params = params.append("pageSize", limit);

    if (options.orderNumber) params = params.append("orderNumber", options.orderNumber);
    if (options.paymentStatus) params = params.append("paymentStatus", options.paymentStatus);
    if (options.paymentType) params = params.append("paymentType", options.paymentType);

    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );
    if (merchantId) params = params.append("merchantId", merchantId);

    return this.httpClient
      .get<TableDataResponse<SalesReport>>(
        `${BASE_URL}${this.config.getSalesReports}`,
        { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<SalesReport>)),
        shareReplay()
      );
  }

  fetchSettlementsReports(
    offset: number,
    limit: number,
    options: {
      reference: string,
      status: string,
      startDate: any;
      endDate: any;
    },
    merchantId: number
  ): Observable<TableDataResponse<SettlementsReport>> {
    let params = new HttpParams();

    if (offset) params = params.append("pageIndex", offset);

    if (limit) params = params.append("pageSize", limit);
    if (merchantId) params = params.append("merchantId", merchantId);

    if (options.reference) params = params.append("reference", options.reference);
    if (options.status) params = params.append("status", options.status);

    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );

    return this.httpClient
      .get<TableDataResponse<SettlementsReport>>(
        `${BASE_URL}${this.config.getSettlementsReports}`,
        { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<SettlementsReport>)),
        shareReplay()
      );
  }

  fetchCashierReports(
    merchantId: number,
    offset: number,
    limit: number,
    options: {
      endDate: string;
      lastName: string;
      firstName: string;
      startDate: string;
    }): Observable<TableDataResponse<CashierReport>> {
    let params = new HttpParams();
    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);
    if (options.firstName) params = params.append("firstName", options.firstName);
    if (options.lastName) params = params.append("lastName", options.lastName);
    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append("endDate", this.dateService.formatEndDate(options.endDate));

    return this.httpClient
      .get<TableDataResponse<CashierReport>>(
        `${BASE_URL}${this.config.getCashierReports}/${merchantId}/cashierreport`, { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<CashierReport>)),
        shareReplay()
      );

  }

  fetchSettlementSummary(merchantId: number): Observable<SettlementSummary> {
    return this.httpClient.get<SettlementSummary>(
      `${BASE_URL}${this.config.getCashierReports}/${merchantId}/settlements/summary`
    ).pipe(shareReplay())
  }

  fetchAllSettlementSummary(): Observable<SettlementSummary> {
    return this.httpClient.get<SettlementSummary>(
      `${BASE_URL}${this.config.getAllSettlementSummary}`
    ).pipe(shareReplay())
  }

  fetchSettlementBalance(merchantId: number): Observable<SettlementBalance> {
    return this.httpClient.get<SettlementBalance>(
      `${BASE_URL}${this.config.getCashierReports}/balance/${merchantId}`
    ).pipe(shareReplay())
  }


  fetchSingleBillingReport(billingId: number): Observable<BillingReport> {
    return this.httpClient.get<BillingReport>(
      `${BASE_URL}${this.config.getAdminBillings}/${billingId}`
    )
  }

    // Get Web Payment Status
    getPaymentStatus(form) {
      return this.httpClient.post(
        `${BASE_URL}${this.config.getPaymentStatus}`,
        form
      );
    }

    // Get Virtual Web Payment Status
    getVirtualPaymentStatus(form) {
      return this.httpClient.post(
        `${BASE_URL}${this.config.getVirtualPaymentStatus}`,
        form
      );
    }

  postSettlementTSQ(payload: {transactionReference: string, amount: number}): Observable<any>{
    return this.httpClient.post<any>(
      `${BASE_URL}${this.config.settlementRequery}`, payload
    )
  }

  cancelInvoice(reference: string) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.cancelInvoice}`,
      { reference }
    )
  }

  requestSettlement(amount: number) {
    return this.httpClient.post(
      `${BASE_URL}/api/accelerex-ecr/settlement-management/v1/settlements`,
      { amount }
    )
  }


  fetchAdminReportSummary(): Observable<any> {
    return this.httpClient.get<any>(
      `${BASE_URL}${this.config.adminSalesReport}`
    ).pipe(shareReplay())
  }

  fetchMerchantsReportSummary(merchantId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${BASE_URL}${this.config.getMerchantSalesReport}${merchantId}/summary`
    ).pipe(shareReplay())
  }

  fetchAdminSalesPaymentMethodSummary(payload): Observable<any> {

    let params = new HttpParams();

    if (payload.startDate) params = params.append("startDate", payload.startDate);
    if (payload.endDate) params = params.append("endDate", payload.endDate);

    return this.httpClient.get<any>(
      `${BASE_URL}${this.config.adminSalesPaymentMethodDashboard}`,
        { params }
    ).pipe(shareReplay())
  }

  fetchMerchantSalesPaymentMethodSummary(merchantId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${BASE_URL}${this.config.merchantSalesPaymentMethodDashboard}/${merchantId}/paymentMethod`
    ).pipe(shareReplay())
  }

  subscriptionUpdate(subData: SubscriptionUpdate): Observable<any> {
    return this.httpClient.post(
      `${BASE_URL}${this.config.updateInvoicePayment}`,
        subData
    )
  }

  manualCardSettlement(fileData: FormData): Observable<
  {
    documentLink: string;
    url: string;
  }[]
  > {
    return this.httpClient.post<
      {
        documentLink: string;
        url: string;
      }[]
    >(`${BASE_URL}${this.config.manualCardSettlement}`, fileData);
  }

  fetchCorporateOrders(
    offset: number,
    limit: number,
    corporateEntityId: string
  ): Observable<TableDataResponse<CorporateEntityOrder>> {
    let params = new HttpParams();

    if (offset) params = params.append("pageIndex", offset);

    if (limit) params = params.append("pageSize", limit);

    if (true) params = params.append("merchantId", 1);

    if (corporateEntityId) params = params.append("corporateEntityId", corporateEntityId);

    return this.httpClient
      .get<TableDataResponse<any>>(
        `${BASE_URL}${this.config.getCorporateOrders}`,
        { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<CorporateEntityOrder>)),
        shareReplay()
      );
  }
}
