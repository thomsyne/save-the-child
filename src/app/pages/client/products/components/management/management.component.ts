import { TableDataResponse } from './../../../../../core/model';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { AlertService } from './../../../../../shared/utility/alert/alert.service';
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseTableComponent } from "@ga/core";
import { FileGenerationService } from "@ga/dynamic-table";
import { map } from "rxjs/operators";
import { PaginationService } from "src/app/shared/dynamic-table/pagination.service";
import { ProductService } from "../../services/products.service";
import {
  downloadCSvheaders,
  filters,
  managementTableSettings,
  productOptionModalData
} from "./management.constants";
import { Product } from '../../model';

@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ManagementComponent extends BaseTableComponent implements OnInit {

  showProductCreateOptionModal: boolean;
  showMultipleProductCreateModal: boolean;
  showDeleteConfirmationModal: boolean = false;
  modalData = productOptionModalData;
  checkedList: any[] = [];
  allProducts$: Observable<TableDataResponse<Product>>;

  constructor(
    paginationService: PaginationService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileGenerationService,
    private alertService: AlertService
  ) {
    super(paginationService);
    this.tableSettings = managementTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Update",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`products/${id}/edit`], {
            queryParams: {
              name: this.filterValues.name,
              code: this.filterValues.code,
              categoryId: this.filterValues.categoryId,
              pageIndex: this.paginationValues.pageIndex,
              currentPage: this.paginationValues.currentPage,
            },
          });
        },
      },
      {
        title: "Check Stock",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.router.navigate([`products/${id}/stocks`],
          );
        },
      },
    ];
  }

  ngOnInit(): void {
    this.getCategories();
  }

  toggleShowProductCreateOptionModal() {
    this.showProductCreateOptionModal = !this.showProductCreateOptionModal;
  }

  showMultipleCreateModal() {
    this.showProductCreateOptionModal = false;
    this.showMultipleProductCreateModal = !this.showMultipleProductCreateModal;
  }

  showDeletionModal(){
    if(this.checkedList.length == 0 && !this.showDeleteConfirmationModal){
      this.alertService.warn('Please select one or more products.')
      return
    }

    if(!this.showDeleteConfirmationModal){
      this.allProducts$.subscribe((response) => {
        this.checkedList = this.checkedList.map((i) => {
          i = response.data.find((x) => x.id == i)
          return i
        })
      })

    }

    this.showDeleteConfirmationModal = !this.showDeleteConfirmationModal
  }

  getProducts() {
    const { name, code, categoryId } = this.filterValues;

    const response$ = this.productService.getAllProducts(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        name,
        code,
        categoryId,
      }
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));

    this.tableData$ = response$.pipe(map((res) => res.data));

    this.allProducts$ = response$
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

  setFilters(filters) {
    // Store filter values in this component
    this.filterValues = filters;

    this.paginationValues.pageIndex =
      +this.route.snapshot.queryParamMap.get("pageIndex") || 0;
    this.paginationValues.currentPage =
      +this.route.snapshot.queryParamMap.get("currentPage") || 1;

    this.getProducts();
  }

  setPager(paginationValues) {
    // Store pagination values in this component
    this.paginationValues = paginationValues;

    this.getProducts();
  }

  receiveCheckedList(checkedList: number[]){
    this.checkedList = checkedList
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { name, code, categoryId } = this.filterValues;

    this.subscriptions.push(
      this.productService
        .getAllProducts(0, count, {
          name,
          code,
          categoryId,
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                name,
                code,
                categoryName,
                price,
                createdOn,
                updatedOn,
                isActive,
                stockTrackingEnabled,
                actionOnLowStock,
                minimumStock,
                imageUrls,
              } = el;

              const dump = {
                name,
                code,
                categoryName,
                price,
                createdOn,
                updatedOn,
                isActive,
                stockTrackingEnabled,
                actionOnLowStock,
                minimumStock,
                imageUrls,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Products",
            this.downloadCSvheaders
          );
        })
    );
  }
}
