import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse, Config, EntityList, TableDataResponse } from "@ga/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment.dev";
import { catchError, shareReplay } from "rxjs/operators";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class EntityService {
  constructor(private httpClient: HttpClient, private config: Config) {}

  fetchSingleEntity(entityId: string): Observable<ApiResponse<EntityList>> {
    return this.httpClient
    .get<ApiResponse<EntityList>>(`${BASE_URL}${this.config.getSingleEntity}/${entityId}`)
    .pipe(shareReplay())
  }

  updateSingleEntity(payload: Partial<EntityList>) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.updateEntity}`,
      payload
    );
  }

  fetchAllEntities(
    offset: number,
    limit: number,
    options?: {
      countryCode: any;
    }
  ): Observable<TableDataResponse<EntityList>> {
    let params = new HttpParams();
    let endpoint = this.config.getEntitiesList

    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);
    if (options?.countryCode) endpoint = endpoint + `?countryCode=${options.countryCode.replace('+', '%2B')}`;

    return this.httpClient
      .get<TableDataResponse<EntityList>>(
        `${BASE_URL}${endpoint}`,
        { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<EntityList>)),
        shareReplay()
      );
  }

  fetchEntities(
    offset: number,
    limit: number
  ): Observable<any> {
    let params = new HttpParams();
    let endpoint = this.config.getEntitiesList

    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);

    return this.httpClient
      .get<any>(
        `${BASE_URL}${endpoint}`,
        { params }
      )
  }

  postCreateEntity(payload: Partial<EntityList>) {
    return this.httpClient.post(`${BASE_URL}${this.config.addEntity}`, payload);
  }
}
