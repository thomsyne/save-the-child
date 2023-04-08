import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewChecked,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { DynamicFormComponent } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { AlertService, LoaderComponent } from "@ga/utility";
import { Subscription } from "rxjs";
import { Product } from "../../model";
import { ProductService } from "../../services/products.service";
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import {
  createProductErrors,
  createProductForm,
} from "./create-product.constants";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent implements OnInit, OnDestroy {
  @ViewChild("createProductForm", { static: false })
  createProductForm: DynamicFormComponent;
  @ViewChild(LoaderComponent, { static: true })
  loader: LoaderComponent;
  @ViewChild(ImageUploadComponent)
  uploadComponent: ImageUploadComponent;

  form = createProductForm;
  errors = createProductErrors;

  buttonDisabled: ButtonState = "INVALID";

  subscriptions: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewChecked() {
    this.subscriptions.push(
      this.createProductForm.form.statusChanges.subscribe(
        (status: ButtonState) => {
          this.buttonDisabled = status;
        }
      )
    );
  }

  getCategories() {
    this.subscriptions.push(
      this.productService.getCategories().subscribe((res) => {
        let store = [];
        res.forEach((category) => {
          store.push([category.name, `${category.id}`]);
        });
        this.form[2].options = new Map(store);
      })
    );
  }

  createProduct(imageUrls: string[]) {
    const {
      name,
      productCategoryId,
      lowStockAction,
      description,
      code,
      price,
      minimumStock,
      stockQuantity,
      stockTracking,
      canExpire,
    } = this.createProductForm.form.value;

    if (Number(stockQuantity) < 1) {
      this.alertService.error("Stock quantity must be greater than 0");
      return;
    }

    const form: Partial<Product> = {
      name,
      productCategoryId,
      lowStockAction,
      description,
      code,
      price,
      minimumStock,
      imageUrls,
      stockQuantity,
      canExpire,
      stockTrackingEnabled: stockTracking,
    };

    this.subscriptions.push(
      this.productService.createProduct(form).subscribe({
        next: (res) => {
          this.alertService.success("Product created succeessfully");
          this.router.navigate(["products"]);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
