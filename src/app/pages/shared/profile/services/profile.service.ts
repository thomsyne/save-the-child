import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Password } from "../model";
import { Observable, of } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private httpClient: HttpClient, private config: Config) {}



  // getAdminDetails(): Observable<AdminDetail[]> {
  //   return this.httpClient
  //     .get<AdminDetail[]>(`${BASE_URL}${this.config.getProductCategories}`)
  //     .pipe(catchError(() => of([] as AdminDetail[])));
  // }


}
