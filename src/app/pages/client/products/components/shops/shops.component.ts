import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { map } from 'rxjs/operators';
import { Shop } from '../../../shops/model';
import { ShopsService } from '../../../shops/services/shops.service';
import { shopsTableSettings, filters, downloadCSvheaders } from './shops.constants';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsComponent extends BaseTableComponent implements OnInit {

  showCreateShopModal: boolean;
  constructor(
    paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    private shopsService: ShopsService,
    private fileService: FileGenerationService
  ) {
    super(paginationService);
    this.tableSettings = shopsTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.updateSelectedShop(id);
          this.router.navigate([`/products/shops/${id}/transactions`], {
            queryParams: {
              name: this.filterValues.name,
              systemName: this.filterValues.systemName,
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

  toggleCreateShopModal() {
    this.showCreateShopModal = !this.showCreateShopModal;
  }

  updateSelectedShop(shopId: string) {
    let shop: Shop;
    this.tableData$.subscribe(shops => {
      shop = shops.find(sh => sh.id === shopId);
      this.shopsService.changeShop(shop);
    });
  }

  getShops() {
    const { name, systemName } = this.filterValues;
    const response$ = this.shopsService.fetchAllShops(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        name, systemName
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
    this.getShops();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getShops();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { name, systemName } = this.filterValues;

    this.subscriptions.push(
      this.shopsService
        .fetchAllShops(0, count, {
          name, systemName
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                name,
                description,
                active,
                merchant,
                systemName,
                address,
                id,
                createdOn,
                updatedOn
              } = el;

              const dump = {
                name,
                description,
                active,
                merchant,
                systemName,
                address,
                id,
                createdOn,
                updatedOn
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Shops",
            this.downloadCSvheaders
          );
        })
    );
  }

}
