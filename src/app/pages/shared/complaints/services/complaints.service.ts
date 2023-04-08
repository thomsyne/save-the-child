import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, DateService, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Complaint } from "../model";
import { Observable, of } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class ComplaintsService {
  constructor(
    private httpClient: HttpClient,
    private config: Config,
    private dateService: DateService,
    ) {}


  fetchComplaints(
    offset: number,
    limit: number,
    options: {
      reference: string;
      category: string;
      status: string;
      startDate: string;
      endDate: string;
    }
  ): Observable<TableDataResponse<Complaint>> {
    let params = new HttpParams();
    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);
    if (options.reference) params = params.append("reference", options.reference);
    if (options.category) params = params.append("category", options.category);
    if (options.status) params = params.append("status", options.status);
    if (options.startDate) params = params.append(
      "startDate", this.dateService.formatStartDate(options.startDate)
    );
    if (options.endDate) params = params.append(
      "endDate", this.dateService.formatEndDate(options.endDate)
    );

    return this.httpClient
      .get<TableDataResponse<Complaint>>(`${BASE_URL}${this.config.getComplaints}`, { params })
      .pipe(
        catchError(() => of({data: []} as TableDataResponse<Complaint>)),
        shareReplay()
      );
  }

  createComplaint(complaint: Partial<Complaint>) {
    return this.httpClient.post(`${BASE_URL}${this.config.createComplaint}`, complaint);
  }

  fetchSingleComplaint(complaintId: number): Observable<Complaint> {
    return this.httpClient.get<Complaint>(
      `${BASE_URL}${this.config.createComplaint}/${complaintId}`
    );
  }

  resolveRejectComplaint(complaintId: number, data) {
    return this.httpClient.put<Complaint>(
      `${BASE_URL}/api/accelerex-ecr/dispute-management/v1/disputes/${complaintId}`,
      data
    );
  }

  addCommentToComplaint(complaintId: number, data) {
    return this.httpClient.post<Complaint>(
      `${BASE_URL}/api/accelerex-ecr/dispute-management/v1/disputes/${complaintId}/addComment`,
      data
    );
  }
}
