import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableDataResponse, BankList, Config } from '@ga/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { AuditLogDetails } from '../model';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class AuditLogsService {

  constructor(private httpClient: HttpClient, private config: Config) {}

  fetchAllAuditLogs(payload): Observable<TableDataResponse<AuditLogDetails>> {
    
    let params = new HttpParams();

    if (payload.pageIndex) params = params.append("pageIndex", payload.pageIndex);
    if (payload.pageSize) params = params.append("pageSize", payload.pageSize);
    if (payload.actionType) params = params.append("actionType", payload.actionType);
    if (payload.severityLevel) params = params.append("severityLevel", payload.severityLevel);
    if (payload.startDate) params = params.append("startDate", payload.startDate);
    if (payload.modifiedDate) params = params.append("modifiedDate", payload.modifiedDate);

    return this.httpClient
      .get<TableDataResponse<AuditLogDetails>>(
        `${BASE_URL}${this.config.getAuditLogs}`,
        { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<AuditLogDetails>)),
        shareReplay()
      );
  }

  fetchSingleLogDetail(logId: number): Observable<AuditLogDetails> {
    return this.httpClient.get<AuditLogDetails>(
      `${BASE_URL}${this.config.getLogDetail}?id=${logId}`,
    ).pipe(
      shareReplay()
    )
  }


}
