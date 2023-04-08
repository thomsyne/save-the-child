import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, DateService, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Observable, of } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";
import { Customer, CustomerOrder } from "../model";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient,
    private config: Config,
    private dateService: DateService,
  ) {}


  fetchAllCustomers(
    offset: number,
    limit: number,
    options?: {
      fullName: any;
      email: string;
      phoneNumber: any;
    }
  ): Observable<TableDataResponse<Customer>> {
    let params = new HttpParams();
    if (options.fullName) params = params.append("fullName", options.fullName);

    if (options.email) params = params.append("Email", options.email.toLowerCase());

    if (options.phoneNumber)
      params = params.append("phoneNumber", options.phoneNumber);

    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);

    return this.httpClient.get<TableDataResponse<Customer>>(
      `${BASE_URL}${this.config.getAllCustomers}`, { params }
    ).pipe(
      catchError(() => of({data: []} as TableDataResponse<Customer>)),
      shareReplay()
    )
  }

  fetchCustomerOrders(
    customerId: number,
    offset: number,
    limit: number,
    options?: {
      orderNumber: any;
      paymentStatus: any;
      paymentType: any;
      startDate: string;
      endDate: string;
    }
  ): Observable<TableDataResponse<CustomerOrder>> {
    let params = new HttpParams();
    if (options.orderNumber) params = params.append("orderNumber", options.orderNumber);

    if (options.paymentStatus) params = params.append("paymentStatus", options.paymentStatus);

    if (options.paymentType)
      params = params.append("paymentType", options.paymentType);

      if (options.startDate) params = params.append(
        "startDate", this.dateService.formatStartDate(options.startDate)
      );
      if (options.endDate) params = params.append(
        "endDate", this.dateService.formatEndDate(options.endDate)
      );

    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);

    return this.httpClient.get<TableDataResponse<CustomerOrder>>(
      `${BASE_URL}${this.config.getCustomerOrders}/${customerId}/orders`, { params }
    ).pipe(
      catchError(() => of({data: []} as TableDataResponse<CustomerOrder>)),
      shareReplay()
    )
  }

  createCustomer(customerData: Partial<Customer>) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.customer}`,
      customerData
    );
  }

  fetchSingleCustomer(customerId: number): Observable<Customer> {
    return this.httpClient.get<Customer>(
      `${BASE_URL}${this.config.getCustomerOrders}/${customerId}`
    )
  }

  fetchSingleOrderDetail(orderId: number): Observable<CustomerOrder> {
    return this.httpClient.get<CustomerOrder>(
      `${BASE_URL}${this.config.getOrderData}/${orderId}`,
    ).pipe(
      shareReplay()
    )
  }

  updateCustomer(customerId: number, customerData: Partial<Customer>) {
    return this.httpClient.put(
      `${BASE_URL}${this.config.customer}/${customerId}`,
      customerData
    );
  }

}