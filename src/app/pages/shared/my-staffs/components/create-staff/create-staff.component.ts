import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, EventEmitter, Output, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { StorageService } from '@ga/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MerchantsService } from 'src/app/pages/admin/merchants/services/merchants.service';
import { Role, Staff } from '../..';
import { StaffsService } from '../../services/staff.service';
import { createStaffFormFields, createStaffModalData, errors } from './create-staff.constants';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateStaffComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  destroy$: Subject<boolean> = new Subject<boolean>();

  title: string = '';
  isAdmin: boolean;
  hasFinishedLoading = false;
  merchantId: number;
  roles: Role[] = [];


  modalData = createStaffModalData;
  createStaffForm = createStaffFormFields;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];

  constructor(
    private staffService: StaffsService,
    private storageService: StorageService,
    private ref: ChangeDetectorRef,
    private alertService: AlertService,
    private merchantsService: MerchantsService,
  ) { }

  ngOnInit(): void {
    this.staffService.currentComponentTitle
      .pipe(takeUntil(this.destroy$))
      .subscribe(componentTitle => {
        this.title = componentTitle;
        this.modalData.header = `Add New ${this.title === "Users" ? "User" : this.title}`
        this.modalData.buttonText = `Add New ${this.title === "Users" ? "User" : this.title}`
      });
    this.isAdmin = this.storageService.isGaAdmin();

    if (this.isAdmin) {
      this.fetchRoles();
    } else {
      this.merchantId = this.storageService.getLoggedInUser().userDetails.merchant.id;
      this.fetchStores();
    }
  }

  fetchStores() {
    this.hasFinishedLoading = false;
    this.merchantsService.fetchMerchantStores(this.merchantId).subscribe({
      next: (res) => {
        const storeOptions = [];
        res.data.forEach((store) => {
          storeOptions.push([store.name, `${store.systemName}`]);
        });
        this.createStaffForm[5].options = new Map(storeOptions);
        this.fetchRoles();
      },
      error : (err) => this.fetchRoles()
    })
  }

  fetchRoles() {
    this.staffService.fetchRolesWithoutTableData().subscribe({
      next: (res) => {
        this.roles = res;
        const roleOptions: Map<string, string> = new Map();
        this.roles.forEach((role) => {
          roleOptions.set(role.name, role.name);
        });
        this.createStaffForm[4].options = roleOptions;
        this.hasFinishedLoading = true;
        this.ref.markForCheck();
      },
      error: (err) => {
        this.hasFinishedLoading = true;
        this.ref.markForCheck();
      }
    })
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.form.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      ),
      this.form.form.valueChanges.subscribe((value) => {
        if (!this.isAdmin && value['userRole'] === "Cashier") {
          this.createStaffForm[5].visible = true;
        } else {
          this.createStaffForm[5].visible = false;
        }
      })
    );

  }

  createStaff() {
    const isEmpty = Object.values(this.form.form.value).every(x => x === null || x === ''|| x === undefined);

    if (isEmpty) {
      this.alertService.error("Required data are missing. Please fill the inputs");
      return;
    };

    const { firstName, lastName, userRole, phoneNumber, email, currentStore } =
    this.form.form.value;

    const payload: Partial<Staff> = {
      firstName,
      lastName,
      userRole,
      phoneNumber,
      email,
      currentStore: userRole === 'Cashier' ? currentStore : "",
      countryCode: "+234"
    };

    if (this.isAdmin) {
      if (!(email.toLowerCase().includes('@globalaccelerex.com') || email.toLowerCase().includes('@accelerexholdings.com')) ) {
        this.alertService.error("Email is neither a Global Accelerex nor Accelerex Holdings email address");
        return;
      }
    }

    this.staffService.addStaff(payload).subscribe({
      next: (res) => {
        this.alertService.success(`${this.title} has been created successfully`);
        this.closeModal.emit();
        this.refreshData.emit();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
