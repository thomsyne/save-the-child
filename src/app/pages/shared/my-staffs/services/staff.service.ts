import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import {
  Config,
  DateService,
  StorageService,
  TableDataResponse,
} from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Role, Staff, ObservedStaff, StaffBalance } from "../model";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";

const BASE_URL = environment.BASE_URL;
const BASE_URL_PGS = environment.BASE_URL_PGS;

@Injectable({
  providedIn: "root",
})
export class StaffsService {
  private componentTitleSource = new BehaviorSubject<string>("");
  currentComponentTitle = this.componentTitleSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private config: Config,
    private dateService: DateService
  ) {}

  changeComponentTitle(title: string) {
    this.componentTitleSource.next(title);
  }

  fetchPermissions(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${BASE_URL}${this.config.permissions}`
    );
  }

  fetchRoleCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${BASE_URL}${this.config.addRole}/roleCategory`
    );
  }

  fetchAllStaff(
    offset: number,
    limit: number,
    options: {
      firstName: string;
      lastName: string;
      Email: string;
      UserRole: string;
      code: string;
    }
  ): Observable<TableDataResponse<Staff>> {
    let params = new HttpParams();
    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);
    if (options.firstName)
      params = params.append("firstName", options.firstName);
    if (options.lastName) params = params.append("lastName", options.lastName);
    if (options.Email) params = params.append("Email", options.Email);
    if (options.UserRole) params = params.append("UserRole", options.UserRole);
    if (options.code) params = params.append("code", options.code);

    return this.httpClient
      .get<TableDataResponse<Staff>>(`${BASE_URL}${this.config.getAllStaffs}`, {
        params,
      })
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<Staff>)),
        shareReplay()
      );
  }

  fetchStaffRoles(
    offset: number,
    limit: number,
    options: {
      Name: string;
      Category: string;
    }
  ): Observable<TableDataResponse<Role>> {
    let params = new HttpParams();
    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);
    if (options.Name) params = params.append("Name", options.Name);
    if (options.Category) params = params.append("Category", options.Category);

    return this.httpClient
      .get<TableDataResponse<Role>>(`${BASE_URL}${this.config.getRoles}`, {
        params,
      })
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<Role>)),
        shareReplay()
      );
  }

  fetchStaffLogs(
    storeSystemName: string,
    offset: number,
    limit: number,
    options: {
      phone: any;
      startDate: string;
      endDate: string;
    }
  ): Observable<TableDataResponse<ObservedStaff>> {
    let params = new HttpParams();
    // if (offset) params = params.append("pageIndex", offset);
    // if (limit) params = params.append("pageSize", limit);
    // if (options.phone) params = params.append("phone", options.phone);
    // if (options.startDate) params = params.append(
    //   "startDate", this.dateService.formatStartDate(options.startDate)
    // );
    // if (options.endDate) params = params.append(
    //   "endDate", this.dateService.formatEndDate(options.endDate)
    // );

    return this.httpClient
      .get<TableDataResponse<ObservedStaff>>(
        `${BASE_URL_PGS}${this.config.auditService}/${storeSystemName}`,
        { params }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<ObservedStaff>)),
        shareReplay()
      );
  }

  addStaff(staff: Partial<Staff>) {
    return this.httpClient.post(`${BASE_URL}${this.config.addStaff}`, staff);
  }

  resendToken(staff: Partial<Staff>) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.resendMerchantActivationEmail}`,
      staff
    );
  }

  addRole(role: Partial<Role>) {
    return this.httpClient.post(`${BASE_URL}${this.config.addRole}`, role);
  }

  updateRole(role: Partial<Role>) {
    return this.httpClient.put(`${BASE_URL}${this.config.addRole}`, role);
  }

  fetchSingleRole(roleName: string): Observable<Role> {
    return this.httpClient.get<Role>(
      `${BASE_URL}${this.config.addRole}/${roleName}`
    );
  }

  fetchRolesWithoutTableData(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${BASE_URL}${this.config.addRole}`);
  }

  fetchRolesInStore(merchantCode): Observable<Role[]> {
    return this.httpClient.get<Role[]>(
      `${BASE_URL}/api/accelerex-ecr/user-management/v1/roles/merchant/${merchantCode}`
    );
  }

  fetchSingleStaff(staffId: number): Observable<Staff> {
    return this.httpClient
      .get<Staff>(`${BASE_URL}${this.config.addStaff}/${staffId}`)
      .pipe(shareReplay());
  }

  updateSingleStaff(
    staffId: number,
    staffUpdate: Partial<Staff>
  ): Observable<Staff> {
    return this.httpClient.put<Staff>(
      `${BASE_URL}${this.config.addStaff}/${staffId}`,
      staffUpdate
    );
  }

  fetchStaffBalance(staffId: number): Observable<StaffBalance> {
    return this.httpClient.get<StaffBalance>(
      `${BASE_URL}${this.config.addStaff}/balance/${staffId}`
    );
  }
}
