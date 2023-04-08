import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { payPOSData } from './pay-menu.constants';

@Component({
  selector: 'app-pay-menu',
  templateUrl: './pay-menu.component.html',
  styleUrls: ['./pay-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayMenuComponent implements OnInit {

  showPOSPayModal: boolean;
  modalData = payPOSData;
  // "/pay/pos"
  controllers = [
    {
      title: "Pay with POS",
      text: "Learn more on how to pay with our POS.",
      route: () => this.togglePOSModal(),
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__pos__terminal.svg"
    },
    {
      title: "Pay with RexPay",
      text: "Make Payment with RexPay.",
      route: () => this.router.navigateByUrl("/pay/rexpay"),
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__file.svg"
    },
    {
      title: "Pay with Transfer",
      text: "Make Payment with virtual Transfer.",
      route: () => this.router.navigateByUrl("/pay/transfer"),
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__file.svg"
    }
  ];

  posPaySteps = [
    'Login to your RexRetail account on your POS Device.',
    'Navigate to the Subscription Page.',
    'Select desired subscription plan.',
    'Insert your debit card.',
    'Enter your debit card pin.',
    'Click on the "Pay Now" button.'
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  togglePOSModal() {
    this.showPOSPayModal = !this.showPOSPayModal;
  }

}
