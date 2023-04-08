import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config, Invoice, PayAdvance, Payment, TableDataResponse, UpcomingSubscriptionDetails, VirtualTransfer } from '@ga/core';
import { environment } from 'src/environments/environment.dev';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})

export class PayNowService {

  constructor(
    private httpClient: HttpClient,
    private config: Config,
  ) { }

  currentInvoiceDetails = new BehaviorSubject<{id: number, reference: string}>(null);

  initiatePayment(form: Payment) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.initiatePayment}`,
      form
    );
  }

  getUpcomingPayment(merchantId: number) {
    return this.httpClient.get<TableDataResponse<Invoice>>(
      `${BASE_URL}/api/accelerex-ecr/merchant-management/v1/merchants/${merchantId}/invoice/upcoming`
    );
  }

  initiatePayAdvance(payload: PayAdvance) {
    return this.httpClient.post<UpcomingSubscriptionDetails>(
      `${BASE_URL}${this.config.payAhead}`,
      payload
    );
  }

  retreiveVirtualTransferDetails(payload: VirtualTransfer){
    return this.httpClient.post<any>(
      `${BASE_URL}${this.config.virtualTransfer}`,
      payload
    );
  }

  getVirtualTransferStatus(transactionReference: string) {
    return this.httpClient.post<any>(
      `${BASE_URL}${this.config.virtualTransferStatus}`,
      {transactionReference}
    );
  }

}
