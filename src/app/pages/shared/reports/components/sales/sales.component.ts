import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartParameters } from '@ga/charts';
import { DateService, StorageService,BaseTableComponent, TableDataResponse } from '@ga/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState, FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { Observable, Subscription } from 'rxjs';
import { SettlementSummary, SettlementBalance } from '../../model';
import { ReportsService } from '../../services/reports.service';
import { requestSettlementModalData, requestSettlementFormFields, errors } from '../settlements/settlements.constants';
import { filters } from './sale.constants';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesComponent implements OnInit {


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

  salesData: ChartParameters
  colors: string[] = ['#F0000D', '#16DCE7', '#2F89FF', '#F7AA1D']
  filters:any;
  dateConverter: any;
  filterForm: any;
  filterValues: any;
  summaryResponse = []

  constructor(
    private storageService: StorageService,
    private reportService: ReportsService,
    private alertService: AlertService,
    private dateService: DateService,
    private ref: ChangeDetectorRef

  ) {
    this.filters = filters;

  }

  ngOnInit(): void {

    this.merchantId = this.storageService.getLoggedInUser()?.userDetails.merchant?.id;
    this.isUserMerchantAdmin = this.storageService.isMerchantAdmin();
    this.getSummary();
    this.isUserMerchantAdmin ? this.getMerchantPaymentReport() : null;
  }

  getSummary() {
    this.summary$ = this.isUserMerchantAdmin ?
      this.reportService.fetchMerchantsReportSummary(this.merchantId) :
      this.reportService.fetchAdminReportSummary() ;
  }

  getAdminPaymentReport(){

    let payload = {
      startDate: this.filterValues?.startDate,
      endDate: this.filterValues?.endDate
    }


    this.reportService.fetchAdminSalesPaymentMethodSummary(payload)
      .subscribe((response) => {
        this.summaryResponse = response;
        this.formatSalesData(response)
      })
  }

  getMerchantPaymentReport(){
    this.reportService.fetchMerchantSalesPaymentMethodSummary(this.merchantId)
      .subscribe((response) => {
        this.summaryResponse = response;
        this.formatSalesData(response)
      })
  }

  formatSalesData(rawResponse){

    let card = rawResponse.find((r) => r.name == 'Card')?.count || 0
    let cash = rawResponse.find((r) => r.name == 'Cash')?.count || 0
    let ussd = rawResponse.find((r) => r.name == 'OnlineUssd')?.count || 0
    let transfer = rawResponse.find((r) => r.name == 'OnlineAccountTransfer')?.count || 0

    this.salesData = {
      chartId: 'Payments',
      chartLabels: ['Card', 'Cash', 'USSD', 'Online Transfer'],
      chartLabelValues: [card, cash, ussd, transfer],
      chartColors: this.colors,
      thinBorder: false,
      chartRepresents: '',
      prefix: ''
    }
    this.ref.detectChanges()

  }

  setFilters(filters) {
    this.filterValues = filters;
    this.isUserMerchantAdmin ? this.getMerchantPaymentReport() : this.getAdminPaymentReport();
  }


  toggleSettlementModal() {
    this.showRequestSettlementModal = !this.showRequestSettlementModal;
  }



}
