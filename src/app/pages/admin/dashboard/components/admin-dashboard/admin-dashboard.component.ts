import { DeviceService } from './../../../../shared/devices/services/devices.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from '@ga/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MerchantDash } from '../..';
import { Merchant } from '../../../merchants';
import { MerchantsService } from '../../../merchants/services/merchants.service';
import { Subscriptions } from '../../model';
import { AdminDashboardService } from '../../services/dashboard.service';
import { DashboardDevice } from 'src/app/pages/shared/devices';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {

  userName: string;
  subscriptionData$: Observable<Subscriptions>;
  merchantData$: Observable<MerchantDash>;
  topMerchants$: Observable<Merchant[]>;
  deviceStatus$: Observable<DashboardDevice>;

  constructor(
    private deviceService: DeviceService,
    private storageService: StorageService,
    private dashboardService: AdminDashboardService,
    private merchantService: MerchantsService,
  ) { }

  ngOnInit(): void {
    this.userName = this.storageService.getLoggedInUser().userDetails.firstName;
    this.getNoOfSubscriptions();
    this.getNoOfMerchantData();
    this.fetchMerchants();
    this.getDashboardDevice()
  }

  getNoOfSubscriptions() {
    this.subscriptionData$ = this.dashboardService.fetchSubscriptions();
  }

  getNoOfMerchantData() {
    this.merchantData$ = this.dashboardService.fetchMerchantDash();
  }

  fetchMerchants() {
    const response$ = this.merchantService.fetchMerchants(0, 4);
    this.topMerchants$ = response$.pipe(map(res => res.data));
  }

  getDashboardDevice(){
    this.deviceStatus$ = this.deviceService.fetchDeviceStatus()
  }

}
