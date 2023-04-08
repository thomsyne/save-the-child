import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { ChartParameters } from "@ga/charts";
import { DateService, StorageService } from "@ga/core";
import { LabelledDropdownParameters } from "@ga/utility";
import { noop, Observable, of, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Merchant } from "src/app/pages/admin/merchants";
import { DashboardCashier } from "../..";
import {
  DashboardCustomer,
  DashboardProduct,
  filterParameters,
  PaymentMethod,
} from "../../model";
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: "app-client-dashboard",
  templateUrl: "./client-dashboard.component.html",
  styleUrls: ["./client-dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDashboardComponent implements OnInit, OnDestroy {
  userName: string;
  endDate: Date;
  startDate: Date;
  merchant: Merchant;

  filterDropdownParameters: LabelledDropdownParameters = filterParameters;
  paymentMethodsValueStatistics$: Observable<ChartParameters>;
  paymentMethodsQuantityStatistics$: Observable<ChartParameters>;

  paymentMethods$: Observable<PaymentMethod[]>;
  topQuantityProducts$: Observable<DashboardProduct[]>;
  topValueProducts$: Observable<DashboardProduct[]>;

  subscriptions: Subscription[] = [];
  topCustomers$: Observable<DashboardCustomer[]>;
  topCashier$: Observable<DashboardCashier[]>;

  // colors
  terminalsColors = [
    "#4C9AFF",
    "#F6AA1C",
    "#4FC3CA",
  ];

  constructor(
    private storageService: StorageService,
    private dashboardService: DashboardService,
    private dateService: DateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.handleFirstTimeUserLogin();
    this.merchant = this.storageService.getLoggedInUser().userDetails.merchant;
    this.userName = this.storageService.getLoggedInUser().userDetails.firstName;

    this.setDateRange(this.filterDropdownParameters.current);
  }

  handleFirstTimeUserLogin() {
    const isAdmin = this.storageService.isGaAdmin();
    const getNewClientSubState = this.storageService.getNewClientSubState();
    const lastLogin = this.storageService.getLoggedInUser().userDetails.lastLogin;

    console.log(this.storageService.getLoggedInUser().invoiceViewModel, getNewClientSubState, lastLogin, isAdmin)

    if (isAdmin) return;

    if (this.storageService.getLoggedInUser().invoiceViewModel && !getNewClientSubState) {
      this.storageService.setNewClientSubState();
      this.router.navigateByUrl("payment");
    }


    //correct once entity subscription status is validated
    if (!lastLogin && !this.storageService.getLoggedInUser().userDetails.merchant.entityCode) {
      this.router.navigateByUrl("payment");
    }


  }

  getTransactionsData() {
    const options = {
      startDate: this.dateService.formatStartDate(this.startDate),
      endDate: this.dateService.formatEndDate(this.endDate),
    };

    const response$ = this.dashboardService.fetchTransaction(options);
  }

  getPaymentMethods() {
    const options = {
      startDate: this.dateService.formatStartDate(this.startDate),
      endDate: this.dateService.formatEndDate(this.endDate),
    };
    this.paymentMethods$ = this.dashboardService.fetchPaymentMethods(
      this.merchant.id,
      options
    );

    this.paymentMethodsValueStatistics$ = this.paymentMethods$.pipe(
      map((res) => {
        return {
          chartId: "paymentMethodsValueChart",
          chartColors: this.terminalsColors,
          chartLabelValues: res.length ? [res[0].sum, res[1].sum, res[2].sum] : [0],
          chartLabels: res.length ? [res[0].name, res[1].name, res[2].name] : [],
          chartRepresents: "NGN",
          thinBorder: false,
        }
      })
    );

    this.paymentMethodsQuantityStatistics$ = this.paymentMethods$.pipe(
      map((res) => {
        return {
          chartId: "paymentMethodsCountChart",
          chartColors: this.terminalsColors,
          chartLabelValues: res.length ? [res[0].count, res[1].count, res[2].count] : [0],
          chartLabels: res.length ? [res[0].name, res[1].name, res[2].name] : [],
          chartRepresents: "Transactions",
          thinBorder: false,
        }
      })
    );
  }

  getTopProductQuantity() {
    const options = {
      startDate: this.dateService.formatStartDate(this.startDate),
      endDate: this.dateService.formatEndDate(this.endDate),
    };

    this.topQuantityProducts$ =
      this.dashboardService.fetchTopProductByQty(options);
  }

  getTopProductValue() {
    const options = {
      startDate: this.dateService.formatStartDate(this.startDate),
      endDate: this.dateService.formatEndDate(this.endDate),
    };

    this.topValueProducts$ =
      this.dashboardService.fetchTopProductByValue(options);
  }

  getTopCashier() {
    const options = {
      startDate: this.dateService.formatStartDate(this.startDate),
      endDate: this.dateService.formatEndDate(this.endDate),
    };

    this.topCashier$ = this.dashboardService.fetchTopCashier(options);
  }

  getTopCustomers() {
    const options = {
      startDate: this.dateService.formatStartDate(this.startDate),
      endDate: this.dateService.formatEndDate(this.endDate),
    };

    this.topCustomers$ = this.dashboardService.fetchTopCustomers(options);
  }

  setDateRange(event) {
    const daysToRemove = Number(event);
    this.endDate = new Date();
    this.startDate = new Date(this.dateService.subtractDays(daysToRemove));
    // this.getTransactionsData();
    this.getTopProductValue();
    this.getTopProductQuantity();
    this.getPaymentMethods();
    this.getTopCashier();
    this.getTopCustomers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
