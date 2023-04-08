import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableDataResponse, BankList, Config } from '@ga/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private httpClient: HttpClient, private config: Config) {}

  fetchAllBanks(
    offset: number,
    limit: number,
    options?: {
      countryCode: any;
    }
  ): Observable<TableDataResponse<BankList>> {
    let params = new HttpParams();

    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);

    return this.httpClient
      .get<TableDataResponse<BankList>>(
        `${BASE_URL}${this.config.getBanksList}/${options.countryCode}`,
        { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<BankList>)),
        shareReplay()
      );
  }

  postCreateBank(payload: Partial<BankList>) {
    return this.httpClient.post(`${BASE_URL}${this.config.addBank}`, payload);
  }

}
