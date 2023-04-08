import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { map } from 'rxjs/operators';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { downloadCSvheaders, filters, subscriptionsTableSettings } from './subscriptions.constants';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsComponent extends BaseTableComponent implements OnInit {

  showCreateSubscriptionModal = false;
  constructor(
    paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    private subscriptionsService: SubscriptionsService,
    private fileService: FileGenerationService,
  ) {
    super(paginationService);
    this.tableSettings = subscriptionsTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`subscriptions/${id}/edit`], {
            queryParams: {
              name: this.filterValues.name,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
            },
          });
        },
      },
    ];
  }

  ngOnInit(): void {

  }

  toggleCreateSubscriptionModal() {
    this.showCreateSubscriptionModal = !this.showCreateSubscriptionModal;
  }
 
  getSubscriptions() {
    const { name } = this.filterValues;
    const response$ = this.subscriptionsService.fetchSubscriptions(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        name
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
    this.getSubscriptions();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getSubscriptions();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { name } = this.filterValues;

    this.subscriptions.push(
      this.subscriptionsService
        .fetchSubscriptions(0, count, {
          name,
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                name,
                fee,
                maxNumberOfStores,
                maxNumberOfUsers,
                maxNumberOfPOSDevices,
                maxNumberOfOtherDevices,
                paymentCycle,
                trialPeriodDays,
                type,
                active,
                id,
                createdOn,
                updatedOn,
              } = el;

              const dump = {
                name,
                fee,
                maxNumberOfStores,
                maxNumberOfUsers,
                maxNumberOfPOSDevices,
                maxNumberOfOtherDevices,
                paymentCycle,
                trialPeriodDays,
                type,
                active,
                id,
                createdOn,
                updatedOn,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Subscriptions",
            this.downloadCSvheaders
          );
        })
    );
  }

}
