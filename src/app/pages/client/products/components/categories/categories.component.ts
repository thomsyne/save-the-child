import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTableComponent } from '@ga/core';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../../model';
import { ProductService } from '../../services/products.service';
import { categoriesTableSettings,
  filters,
  downloadCSvheaders,
} from './categories.constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent extends BaseTableComponent implements OnInit {
  showCreateCategoryModal = false;
  showUpdateProductCategoryModal = false;
  categoryForUpdate: ProductCategory;

  constructor(
    paginationService: PaginationService,
    private productService: ProductService,
    private router: Router,
    private fileService: FileGenerationService,
  ) {
    super(paginationService);
    this.tableSettings = categoriesTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      // {
      //   title: "Disable",
      //   params: ["id"],
      //   class: ["btn__sm", "btn", "btn-outline-primary"],
      //   func: (id) => {
      //     this.router.navigate([`categories/${id}`]);
      //   },
      // },
      {
        title: "Update",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.selectCategoryForUpdate(id);
        },
      },
    ];
  }

  ngOnInit(): void {
  }

  toggleCreateCategoryModal() {
    this.showCreateCategoryModal = !this.showCreateCategoryModal;
  }

  toggleUpdateCategoryModal() {
    this.showUpdateProductCategoryModal = !this.showUpdateProductCategoryModal;
  }

  selectCategoryForUpdate(id) {
    this.tableData$.subscribe(categories => {
      this.categoryForUpdate = categories.find(category => category.id === id);
      this.toggleUpdateCategoryModal();
    });
  }

  getCategories() {
    this.showCreateCategoryModal = false;
    this.showUpdateProductCategoryModal = false;

    const { name } = this.filterValues;
    const response$ = this.productService.fetchCategoriesBySearch(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        name,
      }
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex = 0;
    this.paginationValues.currentPage = 1;

    this.getCategories();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getCategories();
  }


  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { name } = this.filterValues;

    this.subscriptions.push(
      this.productService
        .fetchCategoriesBySearch(0, count, {
          name,
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                id,
                name,
                description,
                merchantId,
                merchantName,
                createdOn,
                updatedOn,
                isActive,
              } = el;

              const dump = {
                id,
                name,
                description,
                merchantId,
                merchantName,
                createdOn,
                updatedOn,
                isActive,
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Products Categories",
            this.downloadCSvheaders
          );
        })
    );
  }
}
