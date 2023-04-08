import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Observable, of } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";
import { DashboardDevice, Device } from "../model";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  constructor(
    private httpClient: HttpClient,
    private config: Config
  ) { }


  fetchAllDevices(
    offset: number,
    limit: number,
    options: {
      deviceType: string;
      identifier: any;
    }
  ): Observable<TableDataResponse<Device>> {
    let params = new HttpParams();
    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);
    console.log(options.deviceType);
    if (options.deviceType && options.deviceType.toLowerCase() !== 'all') params = params.append("deviceType", options.deviceType);
    if (options.identifier) params = params.append("identifier", options.identifier);

    return this.httpClient.get<TableDataResponse<Device>>(
      `${BASE_URL}${this.config.getAllDevices}`, { params }
    ).pipe(
      catchError(() => of({ data: [] } as TableDataResponse<Device>)),
      shareReplay()
    )
  }

  addDevice(device: Partial<Device>) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.addDevice}`,
      device
    );
  }

  changeDeviceStatus(
    payload: {
      id: number;
      isActive: boolean;
    }
  ) {
    return this.httpClient.put(
      `${BASE_URL}${this.config.addDevice}/${payload.id}`, payload
    );
  }

  reAssignDevice(payload) {
    return this.httpClient.put(
      `${BASE_URL}/api/accelerex-ecr/device-management/v1/devices/reassign`, payload
    );
  }

  fetchDeviceStatus(): Observable<DashboardDevice>  {
    return this.httpClient.get<DashboardDevice> (
      `${BASE_URL}${this.config.fetchDeviceStatus}`
    );
  }

}
