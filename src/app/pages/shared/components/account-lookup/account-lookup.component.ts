import { BankService } from './../../../admin/banks/services/bank.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  AccountLookup,
  AccountService,
  BankValidation,
  BaseComponent,
  StorageService,
} from "@ga/core";
import { DynamicFormComponent, KeyValuePair } from "@ga/dynamic-form";
import { AlertService, LoaderComponent } from "@ga/utility";
import { combineLatest } from "rxjs";
import { filter, debounceTime, takeUntil } from "rxjs/operators";
import { accountInformationForm, errors } from "./account-lookup.constants";

@Component({
  selector: "app-account-lookup",
  templateUrl: "./account-lookup.component.html",
  styleUrls: ["./account-lookup.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountLookupComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  @ViewChild("form", { static: false }) accountForm: DynamicFormComponent;

  @Input() accountDetails?: AccountLookup;

  @Output() lookUpComplete = new EventEmitter<AccountLookup>();
  @Output() lookUpFormStatus = new EventEmitter<boolean>();

  accountLookupFormConfig = accountInformationForm;
  prefillData: KeyValuePair[];
  errors = errors;

  totalBanks: number = 500;
  countryCode: string = '';
  bankFormList = []


  constructor(
    private accountService: AccountService,
    private bankService: BankService,
    private alertService: AlertService,
    private storageService: StorageService,
    private ref: ChangeDetectorRef
  ) {
    super();
    this.countryCode = storageService.getCurrentEntity().countryCode?.includes('234') ? 'NG' :
                       storageService.getCurrentEntity().countryCode?.includes('233') ? 'GH' : '';

    this.fetchBanks()
  }

  ngOnInit(): void {
    if (this.accountDetails) {
      this.prefillData = this.accountLookupFormConfig.map((field) => {
        const obj = {
          key: field.name,
          value: this.accountDetails[field.name],
        };
        return obj;
      });
    }
    this.fetchBanks()
  }

  ngAfterViewInit() {
    this.accountForm.form.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (status) => {
          if (status === "INVALID") this.lookUpFormStatus.emit(false);
        },
      });

    combineLatest([
      this.accountForm.form.controls.accountNumber.valueChanges,
      this.accountForm.form.controls.bankName.valueChanges,
    ])
      .pipe(
        filter((values) => values[0].toString().length > 9),
        debounceTime(2000)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (values) => this.verifyAccount(...values),
      });
  }

  fetchBanks(){
    this.bankService.fetchAllBanks(0, this.totalBanks, { countryCode: this.countryCode})
      .subscribe((response) => {
        response['data'].forEach((data) => {
          this.bankFormList.push([data.name, data.code]);
        });
        this.ref.detectChanges()
        this.bankFormList.unshift(['- Select Bank -', ''])
        this.accountLookupFormConfig[1].options = new Map(this.bankFormList);
        this.ref.detectChanges()
      })
  }

  verifyAccount(accountNumber, sortCode) {
    this.loader.start();

    const accountVerifier = {
      sortCode,
      accountNumber,
    };

    this.accountForm.form.controls.accountName.setValue("");

    this.accountService
      .verifyProviderAccount(accountVerifier)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: BankValidation) => {
          this.accountForm.form.controls.accountName.setValue(resp.data.name);

          this.accountForm.formValues["accountName"] = resp.data.name;

          this.lookUpFormStatus.emit(true);
          this.lookUpComplete.emit(this.accountForm.formValues);

          this.ref.markForCheck();
          this.loader.end();
        },
        error: () => {
          this.alertService.error("Account Number and Bank Mismatch");
          this.loader.end();
        },
      });
  }
}
