import { StatusService } from './../../../../shared/statuses/services/status.service';
import { PayNowService } from 'src/app/pages/client/pay-now/pay-now.service';
import { AlertService } from '@ga/utility';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StorageService, VirtualTransfer } from '@ga/core';
import { interval, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentPaymentStatus } from 'src/app/pages/shared/statuses';

@Component({
  selector: 'app-virtual-account',
  templateUrl: './virtual-account.component.html',
  styleUrls: ['./virtual-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualAccountComponent implements OnInit {

  private subscription: Subscription;

  public startDateTime = new Date();
  public endDateTime = new Date();

  minutesInAnHour = 60;
  secondsInAMinute  = 60;
  milliSecondsInASecond = 1000;

  public timeDifference;
  public secondsToEndTime;
  public minutesToEndTime;

  paymentDetails: any;
  amount: string = '0';
  merchantEmail: string = ''
  merchantDetails: any;
  transactionReference: string = ''
  timerStarted: boolean = false;

  invoiceId: number = null
  invoiceReference: string = null;

  queryInProgress: boolean = false;

  isFinalStatus: boolean = false;

  intervalId: any;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private payService: PayNowService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.amount = this.route.snapshot.queryParamMap.get("amount")
    this.merchantEmail = this.storageService.getLoggedInUser().userDetails.email
    this.merchantDetails = this.storageService.getLoggedInUser().userDetails.merchant

    this.payService.currentInvoiceDetails.subscribe((response) => {
      console.log('sdfsfsdfsd')
      this.invoiceId = response.id
      this.invoiceReference = response.reference
    })

    this.retreiveAccountDetails()
  }

  private getTimeDifference () {
    this.timerStarted = true
    this.timeDifference = this.endDateTime.getTime() - new Date().getTime();

    this.allocateTimeUnits(this.timeDifference);
}

  private allocateTimeUnits (timeDifference) {
      this.secondsToEndTime = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.secondsInAMinute);
      this.minutesToEndTime = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.secondsInAMinute);

      this.ref.detectChanges()

      if(this.secondsToEndTime == 0 && this.secondsToEndTime == 0){
        this.subscription.unsubscribe()
        this.initiateRoute()
        clearTimeout(this.intervalId)
      }
  }

  retreiveAccountDetails(){
    
    this.alertService.warn('Account Details Loading...')
    let payload: VirtualTransfer = {
      amount: this.amount,
      customerId: this.merchantEmail,
      currency: this.merchantDetails.currency || 'NGN',
      invoiceReference: this.invoiceReference
    }

    this.payService.retreiveVirtualTransferDetails(payload).subscribe((response) => {
      this.alertService.clear()

      this.paymentDetails = response.data;
      this.transactionReference = response.data.transactionReference
      this.ref.detectChanges()
    })
  }

  checkStatus(){
    this.alertService.warn('Checking transaction status. Please wait...')
    if (!this.timerStarted){

      this.startDateTime = new Date();
      this.endDateTime = new Date();
      this.endDateTime.setMinutes(this.endDateTime.getMinutes() + 1)
      this.subscription = interval(1000).subscribe(x => { this.getTimeDifference()});
    }

    if(!this.queryInProgress){
      this.queryStatusAPI()
    }
  }

  queryStatusAPI(){

    this.queryInProgress = true

    this.payService.getVirtualTransferStatus(this.transactionReference)
      .subscribe((response) => {
        this.queryInProgress = false
        if (response?.responseCode == '00'){

          let statusDetails: CurrentPaymentStatus = {
            callback: 'dashboard/client',
            type: 'success',
            amount: Number(this.amount)
          }

          this.isFinalStatus = true
          clearInterval(this.intervalId)
          this.statusService.currentStatus.next(statusDetails)
          this.router.navigate(['/status/success'])
        }

        // COMMENT: Assumming 01 is failed
        if (response?.responseCode == '01'){

          let statusDetails: CurrentPaymentStatus = {
            callback: `/reports/billings/${this.invoiceId}/billing-info/${this.transactionReference}/status`,
            type: 'failed',
            amount: Number(this.amount)
          }

          this.isFinalStatus = true
          clearInterval(this.intervalId)
          this.statusService.currentStatus.next(statusDetails)
          this.router.navigate(['/status/failed'])
        }


        // COMMENT: Assumming 02 is pending
        if (response?.responseCode == '02'){
          this.alertService.warn(response?.responseDescription)
          this.autoQuery()
        }


      }, (error) => {
        this.queryInProgress = false;

        if (error?.responseCode == '02'){
          this.alertService.warn(error?.responseDescription)
        } else if (error?.responseCode == '01') {
          this.alertService.error(error?.responseCode)
        }
        console.log(error)
        this.autoQuery()
      })
  }

  initiateRoute(){
    this.alertService.warn('Routing to Invoice Page...')
    setTimeout(() => {
      this.router.navigate([
        `/reports/billings/${this.invoiceId}/billing-info/${this.transactionReference}/status`
      ])
    }, 2000);
  }

  autoQuery() {

    if(!this.queryInProgress && this.secondsToEndTime !== 0 && this.secondsToEndTime !== 0 && !this.isFinalStatus ){
      console.log('auto-query')
      this.queryStatusAPI()
    }

    this.intervalId = setTimeout(this.autoQuery, 5000);
  }

}
