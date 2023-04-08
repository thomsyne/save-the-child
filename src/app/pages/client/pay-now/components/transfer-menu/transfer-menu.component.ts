import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-menu',
  templateUrl: './transfer-menu.component.html',
  styleUrls: ['./transfer-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferMenuComponent implements OnInit {

  // "/pay/pos"
  controllers = [
    {
      title: "Subscription",
      text: "Subscription Settings & Renewal.",
      route: () => this.router.navigateByUrl("/pay/transfer/subscription"),
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__pos__terminal.svg"
    },
    {
      title: "Pay In Advance",
      text: "Make Payment For Upcoming Invoices.",
      route: () => this.router.navigateByUrl("/pay/transfer/advance"),
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__file.svg"
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


}
