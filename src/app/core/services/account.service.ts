import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { Observable } from 'rxjs';
import { BankValidation } from '..';


const ACCOUNT_LOOKUP_BASE_URL = environment.ACCOUNT_LOOKUP_BASE_URL;
const ACCOUNT_LOOKUP_ENDPOINT = environment.ACCOUNT_LOOKUP_ENDPOINT;
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  verifyProviderAccount(providerdetails: object): Observable<BankValidation> {
    return this.httpClient.post<BankValidation>(
      `${ACCOUNT_LOOKUP_BASE_URL}${ACCOUNT_LOOKUP_ENDPOINT}`,
      providerdetails
    );
  }
}
