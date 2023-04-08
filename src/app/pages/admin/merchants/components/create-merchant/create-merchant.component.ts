import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  EventEmitter,
  Output,
  ViewChild,
  Input,
} from "@angular/core";
import { DynamicFormComponent } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { AlertService, LoaderComponent } from "@ga/utility";
import { Subscription } from "rxjs";
import { Merchant } from "../../model";
import { MerchantsService } from "../../services/merchants.service";
import {
  createMerchantFormFields,
  createMerchantModalData,
  errors,
} from "./create-merchant.constants";

@Component({
  selector: "app-create-merchant",
  templateUrl: "./create-merchant.component.html",
  styleUrls: ["./create-merchant.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMerchantComponent implements OnInit, AfterViewInit {
  @Input() subscriptionsPlans;
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  @ViewChild(DynamicFormComponent, { static: true })
  form: DynamicFormComponent;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = createMerchantModalData;
  createMerchantForm = createMerchantFormFields;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  constructor(
    private merchantService: MerchantsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.createMerchantForm[3].options = this.subscriptionsPlans;
  }

  ngAfterViewInit() {
    // Subscribe to form validation status
    this.subscriptions.push(
      this.form.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  addMerchant() {
    this.loader.start();
    const {
      name,
      contactPhoneNumber,
      contactEmail,
      subscriptionPlan,
      isBankMerchant,
      currency,
      active,
    } = this.form.formValues;

    const createMerchantPayload: Partial<Merchant> = {
      name,
      contactPhoneNumber,
      contactEmail,
      subscriptionPlan,
      isBankMerchant,
      active,
      countryCode: "+234",
      currency,
    };

    this.merchantService.addMerchant(createMerchantPayload).subscribe({
      next: (res) => {
        this.loader.end();
        this.alertService.success("Merchant Created Successfully");
        this.closeModal.emit();
        this.refreshData.emit();
      },
    });
  }
}
