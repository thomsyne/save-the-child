import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseTableComponent, DateService, StorageService } from "@ga/core";
import { PaginationService, FileGenerationService } from "@ga/dynamic-table";
import { AlertService } from "@ga/utility";
import { map } from "rxjs/operators";
import { ReportsService } from "../../services/reports.service";
import {
  downloadCSvheaders,
  entityOrdersTableSettings,
} from "./entity-order-table-constants";

@Component({
  selector: "app-entity-order-table",
  templateUrl: "./entity-order-table.component.html",
  styleUrls: ["./entity-order-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityOrderTableComponent
  extends BaseTableComponent
  implements OnInit
{
  @Input() code: string;

  constructor(
    paginationService: PaginationService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private reportsService: ReportsService,
    private storageService: StorageService,
    private dateService: DateService,
    private fileService: FileGenerationService
  ) {
    super(paginationService);
    this.tableSettings = entityOrdersTableSettings;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Open",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          router.url.includes("entities")
            ? this.router.navigate([`entities/${id}/details`], {})
            : null;
        },
      },
    ];
  }

  ngOnInit() {
    this.code = this.route.snapshot.params["code"];
    this.getSalesReports();
  }

  getSalesReports() {
    const response$ = this.reportsService.fetchCorporateOrders(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      this.code
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getSalesReports();
  }

  generateCsv() {
    this.alertService.warn('Please wait, your file is being prepared...')
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    this.subscriptions.push(
      this.reportsService
        .fetchCorporateOrders(0, count, this.code
        )
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              el.orderItems = el.orderItems.map((v) => v?.productName + ' x ' + v?.quantity)?.toString()
              const {
                orderNumber,
                orderItems,
                store,
                totalAmount,
                soldBy,
                createdOn,
                customer,
                paymentMethod,
                paymentStatus,
              } = el;

              this.alertService.warn('Please wait, your file is being prepared...')

              const dump = {
                orderNumber,
                orderItems,
                store,
                totalAmount,
                soldBy,
                createdOn,
                customer,
                paymentMethod,
                paymentStatus,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.alertService.success('Downloading...')
          this.fileService.generateCSV(
            res,
            "Merchant Sales Report",
            this.downloadCSvheaders
          );
        })
    );
  }
}
