import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShopsComponent } from "./components/shops/shops.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { CreateProductComponent } from "./components/create-product/create-product.component";
import { ManagementComponent } from "./components/management/management.component";
import { ProductsContainerComponent } from "./components/products-container/products-container.component";
import { ProductsControlComponent } from "./components/products-control/products-control.component";
import { StocksComponent } from "./components/stocks/stocks.component";
import { InventoryComponent } from "./components/inventory/inventory.component";
import { ShopProfileComponent } from "./components/shop-profile/shop-profile.component";
import { ShopTransactionsComponent } from "./components/shop-transactions/shop-transactions.component";
import { ShopViewComponent } from "./components/shop-view/shop-view.component";
import { UpdateProductComponent } from "./components/update-product/update-product.component";
import { TransactionInfoComponent } from "./components/transaction-info/transaction-info.component";
import { CreateProductGuard, SearchUserGuard, UpdateProductGuard, ViewCategoryGuard, ViewOrderGuard, ViewProductGuard, ViewStoresGuard } from "@ga/core";
import { ShopInventoryComponent } from "./components/shop-inventory/shop-inventory.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsContainerComponent,
    children: [
      // {
      //   path: "",
      //   component: ProductsControlComponent,
      // },
      {
        path: "",
        component: ManagementComponent,
        canActivate: [ViewProductGuard],
      },
      {
        path: ":id/edit",
        component: UpdateProductComponent,
        canActivate: [ViewProductGuard, UpdateProductGuard],
      },
      {
        path: "categories",
        component: CategoriesComponent,
        canActivate: [ViewCategoryGuard]
      },
      {
        path: ":id/stocks",
        component: StocksComponent,
      },
      {
        path: "create",
        component: CreateProductComponent,
        canActivate: [CreateProductGuard],
      },
      {
        path: "shops",
        canActivate: [ViewStoresGuard],
        children: [
          {
            path: ":id",
            component: ShopViewComponent,
            children: [
              {
                path: "transactions",
                component: ShopTransactionsComponent,
                canActivate: [ViewOrderGuard]
              },
              {
                path: "profile",
                component: ShopProfileComponent,
                canActivate: [SearchUserGuard]
              },
              {
                path: "inventory",
                component: ShopInventoryComponent,
              }
            ]
          },
          {
            path: "",
            component: ShopsComponent
          },
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
