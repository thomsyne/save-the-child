import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ShopsService } from "../../../shops/services/shops.service";
import { updateShopForm, errors } from "./shop-profile.constants";
import { DynamicFormComponent } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { Observable, Subscription } from "rxjs";
import { Staff } from "src/app/pages/shared/my-staffs";
import { Shop } from "../../../shops/model";
import { AlertService, LoaderComponent } from "@ga/utility";

@Component({
  selector: "app-shop-profile",
  templateUrl: "./shop-profile.component.html",
  styleUrls: ["./shop-profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopProfileComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: false }) loader: LoaderComponent;
  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;

  shopId: number;
  cashiers$: Observable<Staff[]>;
  shop$: Observable<Shop>;
  shop: Shop;

  shopForm = updateShopForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private shopsService: ShopsService,
    private ref: ChangeDetectorRef,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.shopId = this.route.parent.snapshot.params["id"];
    this.getCashiers();
    this.getShop();
  }

  getCashiers() {
    this.cashiers$ = this.shopsService.fetchCashiers(this.shopId);
  }

  getShop() {
    this.shop$ = this.shopsService.currentShop;
    this.shop$.subscribe((res) => {
      this.shop = res;
      console.log(res);
      this.shopForm[0].defaultValue = res.name;
      this.ref.markForCheck();
    });
  }

  updateShop(statusUpdate?: boolean) {
    this.loader.start();
    const shopName = this.form.form.value;
    const payload = {
      active: statusUpdate ? !this.shop.active : this.shop.active,
      address: this.shop.address,
      description: this.shop.description,
      id: this.shop.id,
      ...shopName,
    };

    this.shopsService.updateShop(this.shopId, payload).subscribe({
      next: (shop) => {
        this.loader.end();
        this.shopsService.changeShop(shop);
        this.alertService.success("Shop updated successfully");
      },
      error: () => this.loader.end(),
    });
  }
}
