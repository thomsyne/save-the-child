import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewChecked, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { AlertService, LoaderComponent } from '@ga/utility';
import { Subscription } from 'rxjs';
import { Product, ProductCategory } from '../..';
import { ProductService } from '../../services/products.service';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { updateProductErrors, updateProductFormData } from './update-product.constants';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProductComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("ProductForm", { static: false })
  updateProductForm: DynamicFormComponent;
  @ViewChild(LoaderComponent, { static: true })
  loader: LoaderComponent;
  @ViewChild(ImageUploadComponent)
  uploadComponent: ImageUploadComponent;

  form = updateProductFormData;
  errors = updateProductErrors;
  productId: number;
  product: Product;
  categories: ProductCategory[] = [];

  buttonDisabled: ButtonState = "VALID";
  subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.updateProductForm.form.statusChanges.subscribe(
        (status: ButtonState) => {
          this.buttonDisabled = status;
        }
      )
    );
  }

  getCategories() {
    this.subscriptions.push(
      this.productService.getCategories().subscribe((res) => {
        this.categories = res;
        let store = [];
        res.forEach((category) => {
          store.push([category.name, `${category.id}`]);
        });
        this.form[2].options = new Map(store);
        this.getProductDetails(this.productId);
      })
    );
  }

  getProductDetails(id: number) {
    this.productService.fetchSingleProduct(id).subscribe(res => {
      this.product = res;
      this.updateProductForm.form.patchValue({
        name: this.product.name,
        code: this.product.code,
        productCategoryId: this.categories.find(cat => cat.name === this.product.categoryName).id,
        lowStockAction: this.product.actionOnLowStock,
        minimumStock: this.product.minimumStock,
        description: this.product.description,
        stockTracking: this.product.stockTrackingEnabled,
        canExpire: this.product.canExpire,
        price: this.product.price,
        isActive: this.product.isActive,
        stockQuantity: this.product.stockQuantity
      });
    })
  }


  updateProducts(imageUrls: string[]) {
    const {
      name,
      productCategoryId,
      lowStockAction,
      description,
      code,
      price,
      minimumStock,
      stockTracking,
      canExpire,
      isActive,
      stockQuantity
    } = this.updateProductForm.form.value;

    const form: Partial<Product> = {
      name,
      productCategoryId,
      lowStockAction,
      description,
      code,
      price,
      minimumStock,
      imageUrls,
      canExpire,
      stockTrackingEnabled: stockTracking,
      id: this.productId,
      isActive,
      quantity: Number(stockQuantity)
    };

    this.subscriptions.push(
      this.productService.updateProduct(this.productId, form).subscribe({
        next: (res) => {
          this.alertService.success('Product updated successfully!');
          this.router.navigate(["products"]);
        }
      })
    );
  }


  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
