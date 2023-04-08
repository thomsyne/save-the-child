import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosComponent implements OnInit {

  controllers = [
    {
      title: "Subscription",
      text: "Subscription Settings & Renewal.",
      route: "/pay/pos",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__pos__terminal.svg"
    },
    // {
    //   title: "Pay In Advance",
    //   text: "Make Payment For Upcoming Invoices.",
    //   route: "/reports/rexpay",
    //   img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__file.svg"
    // },
    {
      title: "Invoice History",
      text: "View All Invoice Payments Made.",
      route: "/reports/billings",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__pos__terminal.svg"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
