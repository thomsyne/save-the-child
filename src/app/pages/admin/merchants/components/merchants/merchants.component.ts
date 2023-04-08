import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseTableComponent, Merchant, StorageService } from "@ga/core";
import { FileGenerationService, PaginationService } from "@ga/dynamic-table";
import { AlertService } from "@ga/utility";
import { map } from "rxjs/operators";
import { SubscriptionsService } from "../../../subscriptions/services/subscriptions.service";
import { MerchantsService } from "../../services/merchants.service";
import {
  downloadCSvheaders,
  filters,
  merchantsTableSettings,
} from "./merchants.constants";

@Component({
  selector: "app-merchants",
  templateUrl: "./merchants.component.html",
  styleUrls: ["./merchants.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantsComponent extends BaseTableComponent implements OnInit {
  showCreateMerchantModal = false;
  subscriptionsPlans;
  constructor(
    paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    private merchantsService: MerchantsService,
    private subscriptionsService: SubscriptionsService,
    private fileService: FileGenerationService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
    super(paginationService);
    this.tableSettings = merchantsTableSettings;

    this.filters = filters;

    this.downloadCSvheaders = downloadCSvheaders;

    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`merchants/${id}/profile`], {
            queryParams: {
              name: this.filterValues.name,
              code: this.filterValues.code,
              subscriptionPlan: this.filterValues.subscriptionPlan,
              subscriptionType: this.filterValues.subscriptionType,
              pendingValidation: this.filterValues.pendingValidation,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
            },
          });
        },
        condition: () => {
          return this.storageService.getPermissons().includes('CAN_UPDATE_MERCHANT');
        }
      },
      {
        title: "Activate",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        condition: (merchant: Merchant) => {
          return merchant.currentSubscriptionPlan?.type === 'lease' &&
            merchant.subscriptionStatus === 'PendingValidation' &&
            this.storageService.getPermissons().includes('CAN_UPDATE_MERCHANT');
        },
        func: (id) => {
          this.activateLeaseMerchant(id);
        },
      },
    ];
  }

  ngOnInit(): void {
    this.getAllSubscriptions();
  }

  getAllSubscriptions() {
    this.subscriptionsService.fetchAllSubscriptions().subscribe((res) => {
      let store = [];
      res.forEach((susbcription) => {
        store.push([susbcription.name, `${susbcription.name}`]);
      });
      this.subscriptionsPlans = new Map(store);
    });
  }

  toggleCreateMerchantModal() {
    this.showCreateMerchantModal = !this.showCreateMerchantModal;
  }

  activateLeaseMerchant(id: number) {
    this.merchantsService.activateLeaseMerchant(id).subscribe(
      (res) => {
        this.getMerchants();
        this.alertService.success("Successful");
      },
    );
  }


  getMerchants() {
    const { name, code, subscriptionPlan, subscriptionType, pendingValidation } = this.filterValues;
    const response$ = this.merchantsService.fetchMerchants(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        name,
        code,
        subscriptionPlan,
        subscriptionType,
        pendingValidation
      }
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex =
      +this.route.snapshot.queryParamMap.get("pageIndex") || 0;
    this.paginationValues.currentPage =
      +this.route.snapshot.queryParamMap.get("currentPage") || 1;
    this.getMerchants();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getMerchants();
  }

  generateCsv() {
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));
    const { name, code, subscriptionPlan, subscriptionType, pendingValidation } = this.filterValues;

    this.subscriptions.push(
      this.merchantsService
        .fetchMerchants(0, count, {
          name,
          code,
          subscriptionPlan,
          subscriptionType,
          pendingValidation
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                name,
                code,
                contactEmail,
                contactPhoneNumber,
                currency,
                accountName,
                accountNumber,
                bankCode,
                active,
                createdOn,
                startDate,
                nextPaymentDate,
                updatedOn,
                subscriptionPlan,
                subscriptionStatus,
              } = el;

              const dump = {
                name,
                code,
                contactEmail,
                contactPhoneNumber,
                currency,
                accountName,
                accountNumber,
                bankCode,
                active,
                createdOn,
                startDate,
                nextPaymentDate,
                updatedOn,
                subscriptionPlan,
                subscriptionStatus,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Merchants",
            this.downloadCSvheaders
          );
        })
    );
  }
}
