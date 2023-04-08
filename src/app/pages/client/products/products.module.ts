import { ConfirmDeletionComponent } from './components/confirm-deletion/confirm-deletion.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DynamicTableModule } from "@ga/dynamic-table";
import { UtilityModule } from "@ga/utility";
import { ProductsRoutingModule } from "./products-routing.module";
import { SkeletonModule } from "@ga/skeleton";
import { ModalModule } from "@ga/modal";
import { DynamicFormModule } from "@ga/dynamic-form";

import { ManagementComponent } from "./components/management/management.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { ShopsComponent } from "./components/shops/shops.component";
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductsContainerComponent } from "./components/products-container/products-container.component";
import { ProductsControlComponent } from "./components/products-control/products-control.component";
import { StocksComponent } from "./components/stocks/stocks.component";
import { CreateProductComponent } from "./components/create-product/create-product.component";
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { CreateProductCategoryComponent } from './components/create-product-category/create-product-category.component';
import { CreateShopComponent } from "./components/create-shop/create-shop.component";
import { UpdateProductComponent } from "./components/update-product/update-product.component";
import { ShopProfileComponent } from "./components/shop-profile/shop-profile.component";
import { ShopTransactionsComponent } from "./components/shop-transactions/shop-transactions.component";
import { ShopViewComponent } from './components/shop-view/shop-view.component';
import { UpdateProductCategoryComponent } from './components/update-product-category/update-product-category.component';
import { CreateMultipleProductsComponent } from './components/create-multiple-products/create-multiple-products.component';
import { TransactionInfoComponent } from './components/transaction-info/transaction-info.component';
import { ShopInventoryComponent } from "./components/shop-inventory/shop-inventory.component";

@NgModule({
  declarations: [
    ProductsContainerComponent,
    ProductsControlComponent,
    CategoriesComponent,
    StocksComponent,
    ManagementComponent,
    CreateProductComponent,
    ImageUploadComponent,
    CreateProductCategoryComponent,
    ShopsComponent,
    InventoryComponent,
    CreateShopComponent,
    UpdateProductComponent,
    ShopTransactionsComponent,
    ShopProfileComponent,
    ShopInventoryComponent,
    ShopViewComponent,
    UpdateProductCategoryComponent,
    CreateMultipleProductsComponent,
    TransactionInfoComponent,
    ConfirmDeletionComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    DynamicTableModule,
    DynamicFormModule,
    UtilityModule,
    SkeletonModule,
    ModalModule
  ],
})
export class ProductsModule {}
