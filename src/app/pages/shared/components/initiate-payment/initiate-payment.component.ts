import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Payment } from '@ga/core';
import { PayNowService } from 'src/app/pages/client/pay-now/pay-now.service';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-initiate-payment',
  templateUrl: './initiate-payment.component.html',
  styleUrls: ['./initiate-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitiatePaymentComponent implements OnInit {

  @Input() invoiceReference: string;
  @Input() invoiceId: number;

  isLoading: boolean = false;

  constructor(
    private ref: ChangeDetectorRef,
    private payService: PayNowService
  ) {}

  ngOnInit(): void {

  }

  initiatePayment() {
    this.isLoading = true;

    const form: Payment = {
      reference: this.invoiceReference,
      callbackUrl: `${environment.BASE_URL}/reports/billings/${this.invoiceId}/billing-info/status`,
    };

    this.payService.initiatePayment(form).subscribe({
      next: (res) => {
        window.location.href = res["paymentLink"];
        this.isLoading = false;
        this.ref.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.ref.markForCheck();
      }
    });
  }


}
