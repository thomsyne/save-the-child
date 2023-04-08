import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice, StorageService } from '@ga/core';
import { InitiatePaymentComponent } from 'src/app/pages/shared/components/initiate-payment/initiate-payment.component';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstLoginComponent implements OnInit {
  @ViewChild(InitiatePaymentComponent)
  initiatePaymentComponent: InitiatePaymentComponent;
  pendingInvoice: Invoice = null;

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.pendingInvoice = this.storageService.getLoggedInUser().invoiceViewModel;
  }

  backToDashboard() {
    this.storageService.setNewClientSubState();
    this.router.navigateByUrl("/dashboard/client");
  }
  payNow() {
    this.initiatePaymentComponent.initiatePayment();
  }

}
