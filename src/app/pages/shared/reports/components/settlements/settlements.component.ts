import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StorageService } from '@ga/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { Observable, Subscription } from 'rxjs';
import { SettlementSummary, SettlementBalance } from '../../model';
import { ReportsService } from '../../services/reports.service';
import { errors, requestSettlementFormFields, requestSettlementModalData } from './settlements.constants';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettlementsComponent implements OnInit {
  
  @ViewChild("requestFormRef", { static: false }) requestForm: DynamicFormComponent;

  merchantId: number;
  isUserMerchantAdmin = false;
  showRequestSettlementModal = false;
  summary$: Observable<SettlementSummary>;
  balance$: Observable<SettlementBalance>;

  modalData = requestSettlementModalData;
  optFormField = requestSettlementFormFields;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];

  constructor(
    private storageService: StorageService,
    private reportService: ReportsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.merchantId = this.storageService.getLoggedInUser()?.userDetails.merchant?.id;
    this.isUserMerchantAdmin = this.storageService.isMerchantAdmin();
    this.getSummary();
    this.isUserMerchantAdmin && this.getBalance();
  }

  getSummary() {
    this.summary$ = this.isUserMerchantAdmin ?
      this.reportService.fetchSettlementSummary(this.merchantId) :
      this.reportService.fetchAllSettlementSummary() ;
  }

  getBalance() {
    this.balance$ = this.reportService.fetchSettlementBalance(this.merchantId);
  }

  toggleSettlementModal() {
    this.showRequestSettlementModal = !this.showRequestSettlementModal;
  }

  makeRequest(balance) {
    console.log(balance);
    const { amount} = this.requestForm.form.value;

    if (!amount) {
      this.alertService.error('Please enter amount');
      return;
    }

    if (amount > balance) {
      this.alertService.error('The amount you are requesting for is more than your available balance: ₦' + balance);
      return;
    }

    this.reportService.requestSettlement(amount).subscribe({
      next: (res) => {
        this.alertService.success('Settlement request has been sent successfully');
        this.toggleSettlementModal();
      }
    })
  }
}
