import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from '@ga/core';

@Component({
  selector: 'app-reports-control',
  templateUrl: './reports-control.component.html',
  styleUrls: ['./reports-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsControlComponent implements OnInit {

  controllers = [
    {
      title: "Sales Reports",
      permission: this.storageService.isGaAdmin() ? 'CAN_VIEW_ALL_ORDERS' : 'CAN_VIEW_ORDER',
      text: "Reporting on the sales that have happened across your shops.",
      route: "/reports/sales",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__bank.svg"
    },
    {
      title: "Settlement Reports",
      permission: this.storageService.isGaAdmin() ? 'CAN_VIEW_ALL_SETTLEMENT' : 'CAN_VIEW_SETTLEMENT',
      text: "Report on how you’ve been settled for all card transactions.",
      route: "/reports/settlements",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__file.svg"
    },
    {
      title: "Billing Reports",
      permission: this.storageService.isGaAdmin() ? 'CAN_CREATE_ALL_MERCHANTS_BILL' : 'CAN_VIEW_MERCHANT_BILL',
      text: "Report on how you have been billed for your subscription plan.",
      route: "/reports/billings",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__pos__terminal.svg"
    },
    {
      title: "Cashier Reports",
      permission: 'CAN_VIEW_ORDER',
      text: "Performance reports on the cashiers in your shops.",
      route: "/reports/cashiers",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__pos__terminal.svg"
    },
  ]

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    if (this.storageService.isGaAdmin()) {
      this.controllers.splice(3, 1);
    }
  }

}
