import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseTableComponent, DateService } from "@ga/core";
import { FileGenerationService } from "@ga/dynamic-table";
import { AlertService } from "@ga/utility";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { PaginationService } from "src/app/shared/dynamic-table/pagination.service";
import { ProductService } from "../../services/products.service";
import { Shop, ShopInventory } from "../../../shops/model";
import { ShopsService } from "../../../shops/services/shops.service";
import {
  downloadCSvheaders,
  filters,
  shopInventoryTableSettings,
  increaseQuantityFormFields,
  reduceQuantityFormFields,
  errors,
  expiryDateFormFields,
} from "./shops-inventory.constants";
import { DynamicFormComponent } from "@ga/dynamic-form";

@Component({
  selector: "app-shop-inventory",
  templateUrl: "./shop-inventory.component.html",
  styleUrls: ["./shop-inventory.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopInventoryComponent
  extends BaseTableComponent
  implements OnInit
{
  @ViewChild("reduceQuantityFormRef", { static: false })
  reduceQuantityFormRef: DynamicFormComponent;
  @ViewChild("increaseQuantityFormRef", { static: false })
  increaseQuantityFormRef: DynamicFormComponent;
  @ViewChild("expiryDateFormRef", { static: false })
  expiryDateFormRef: DynamicFormComponent;

  id: number;
  shop$: Observable<Shop>;
  isShop: boolean;

  itemToIncreaseQuanity: Partial<ShopInventory> = {
    id: undefined,
    name: undefined,
    quantity: undefined,
  };
  itemToReduceQuanity: Partial<ShopInventory> = {
    id: undefined,
    name: undefined,
    quantity: undefined,
  };
  itemToExpire: Partial<ShopInventory> = {
    id: undefined,
    name: undefined,
    quantity: undefined,
    expiryDate: undefined,
  };

  showAddQuantityModal = false;
  showReduceQuantityModal = false;
  showExpiryModal = false;
  increaseQuantityForm = increaseQuantityFormFields;
  reduceQuantityForm = reduceQuantityFormFields;
  expiryDateForm = expiryDateFormFields;
  errors = errors;

  constructor(
    paginationService: PaginationService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private shopsService: ShopsService,
    private productService: ProductService,
    private dateService: DateService,
    private fileService: FileGenerationService,
    private ref: ChangeDetectorRef
  ) {
    super(paginationService);
    this.tableSettings = shopInventoryTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Add Quantity",
        params: ["id", "quantity", "name"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id, quantity, name) => {
          this.itemToIncreaseQuanity.id = id;
          this.itemToIncreaseQuanity.name = name;
          this.itemToIncreaseQuanity.quantity = quantity;
          this.increaseQuantityForm[0].defaultValue = 0;
          this.showAddQuantityModal = true;
        },
      },
      {
        title: "Reduce Quantity",
        params: ["id", "quantity", "name"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id, quantity, name) => {
          this.itemToReduceQuanity.id = id;
          this.itemToReduceQuanity.name = name;
          this.itemToReduceQuanity.quantity = quantity;
          this.reduceQuantityForm[0].defaultValue = 0;
          this.showReduceQuantityModal = true;
        },
      },
      {
        title: "Add Expiry Date",
        params: ["id", "expiryDate", "name", "quantity"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id, expiryDate, name, quantity) => {
          this.itemToExpire.id = id;
          this.itemToExpire.name = name;
          this.itemToExpire.expiryDate = expiryDate;
          this.itemToExpire.quantity = quantity;
          this.expiryDateForm[0].defaultValue = expiryDate;
          this.showExpiryModal = true;
        },
      },
    ];
    // this.filters[3].defaultValue = this.dateService.formatStartDate(this.filters[3].defaultValue);
    // this.filters[4].defaultValue = this.dateService.formatEndDate(this.filters[4].defaultValue);
  }

  ngOnInit(): void {
    this.getCategories();
    this.id = this.route.parent.snapshot.params["id"];
    this.shop$ = this.shopsService.currentShop;
    this.shop$.pipe(take(1)).subscribe((shop) => {
      shop ? (this.isShop = true) : this.router.navigate([`shops`]);
    });
  }

  getCategories() {
    this.subscriptions.push(
      this.productService.getCategories().subscribe((res) => {
        let store = [];
        res.forEach((category) => {
          store.push([category.name, `${category.id}`]);
        });
        this.filters[2].options = new Map(store);
        // this.category = new Map(store);
      })
    );
  }

  getShopInventory() {
    const { name, code, category, startExpiryDate, endExpiryDate } =
      this.filterValues;

    if (
      startExpiryDate > new Date() ||
      (endExpiryDate && startExpiryDate > endExpiryDate)
    ) {
      return this.alertService.info("Invalid Start Date");
    }

    const response$ = this.shopsService.fetchShopInventory(
      this.id,
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        endExpiryDate,
        startExpiryDate,
        name,
        code,
        category,
      }
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex = 0;
    this.paginationValues.currentPage = 1;
    this.getShopInventory();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getShopInventory();
  }

  updateInventoryIncrease() {
    const { quantity, reason } = this.increaseQuantityFormRef.form.value;

    if (!reason || (reason && !reason.trim())) {
      return this.alertService.error("Please provide a reason");
    }

    const payload = {
      productId: this.itemToIncreaseQuanity.id,
      storeId: this.id,
      quantity: +quantity,
      inventoryActionType: "Increase",
      reason,
    };

    this.productService.updateProductStatus(payload).subscribe({
      next: (res) => {
        this.showAddQuantityModal = false;
        this.alertService.success("Inventory Updated Successfully");
        this.getShopInventory();
        this.ref.markForCheck();
      },
    });
  }

  updateInventoryReduction() {
    const { quantity, reason } = this.reduceQuantityFormRef.form.value;

    if (!reason || (reason && !reason.trim())) {
      return this.alertService.error("Please provide a reason");
    }

    const payload = {
      productId: this.itemToReduceQuanity.id,
      storeId: +this.id,
      quantity: +quantity,
      inventoryActionType: "Decrease",
      reason,
    };

    this.productService.updateProductStatus(payload).subscribe({
      next: (res) => {
        this.showReduceQuantityModal = false;
        this.alertService.success("Inventory Updated Successfully");
        this.getShopInventory();
        this.ref.markForCheck();
      },
    });
  }

  updateInventoryExpiryDate() {
    const { expiryDate, reason } = this.expiryDateFormRef.form.value;

    if (!expiryDate) {
      this.alertService.error("Please provide an expiry date");
      return;
    }

    // Validate Date (expirtDate > today)
    if (new Date(expiryDate) < new Date()) {
      return this.alertService.error("Invalid Date");
    }

    const payload = {
      productId: this.itemToExpire.id,
      storeId: +this.id,
      expiryDate: this.dateService.formatStartDate(expiryDate),
      inventoryActionType: "Increase",
      quantity: this.itemToExpire.quantity,
      reason: "Set Expiry"
    };

    this.productService.updateProductStatus(payload).subscribe({
      next: (res) => {
        this.showExpiryModal = false;
        this.alertService.success("Inventory Updated Successfully");
        this.getShopInventory();
        this.ref.markForCheck();
      },
    });
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { name, code, category, startExpiryDate, endExpiryDate } =
      this.filterValues;

    this.subscriptions.push(
      this.shopsService
        .fetchShopInventory(this.id, 0, count, {
          endExpiryDate,
          startExpiryDate,
          name,
          code,
          category,
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                id,
                name,
                code,
                description,
                price,
                stockTrackingEnabled,
                actionOnLowStock,
                isActive,
                categoryName,
                minimumStock,
                createdOn,
                updatedOn,
                quantity,
                imageUrl,
                lowStock,
              } = el;

              const dump = {
                id,
                name,
                code,
                description,
                price,
                stockTrackingEnabled,
                actionOnLowStock,
                isActive,
                categoryName,
                minimumStock,
                createdOn,
                updatedOn,
                quantity,
                imageUrl,
                lowStock,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Shop Inventory",
            this.downloadCSvheaders
          );
        })
    );
  }
}
