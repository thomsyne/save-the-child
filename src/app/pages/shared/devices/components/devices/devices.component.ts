import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BaseTableComponent, Merchant, StorageService } from '@ga/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { FileGenerationService, PaginationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { map } from 'rxjs/operators';
import { MerchantsService } from 'src/app/pages/admin/merchants/services/merchants.service';
import { Device } from '../..';
import { DeviceService } from '../../services/devices.service';
import { devicesTableSettings, filters, downloadCSvheaders, changeDeviceStateModalData, reAssignFormFields, errors } from './devices.constants';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesComponent extends BaseTableComponent implements OnInit {
  @ViewChild("AssignmentFormRef", { static: false }) assignmentForm: DynamicFormComponent;
  showCreateDeviceModal = false;
  showDeviceStateModal = false;
  showDeviceReassignModal = false;

  deviceStateModalData = changeDeviceStateModalData;
  deviceForUpdate: Device;
  deviceToReassign: Device;
  isAdmin = false;

  merchants: Merchant[] = [];
  merchantsFormOptions = null;
  merchantsForAssignmentFormOptions = null;


  deviceReassignForm = reAssignFormFields;
  errors = errors;

  constructor(
    paginationService: PaginationService,
    private ref: ChangeDetectorRef,
    private deviceService: DeviceService,
    private storageService: StorageService,
    private merchantsService: MerchantsService,
    private alertService: AlertService,
    private fileService: FileGenerationService
  ) {
    super(paginationService);
    this.tableSettings = devicesTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [
      {
        title: "Re-assign",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.selectDeviceForReassignment(id);
        },
        condition: (device: Device) => {
          return this.isAdmin && this.storageService.getPermissons().includes('CAN_REASSIGN_DEVICE') && device['typeOfDevice'] !== "Others";
        }
      },
      {
        title: "Disable",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.selectDeviceForUpdate(id);
        },
        condition: (device: Device) => {
          return device.isActive && this.storageService.getPermissons().includes('CAN_MANAGE_DEVICE');
        }
      },
      {
        title: "Enable",
        params: ["id"],
        class: ["btn__sm", "btn", "btn-outline-primary"],
        func: (id) => {
          this.selectDeviceForUpdate(id);
        },
        condition: (device: Device) => {
          return !device.isActive && this.storageService.getPermissons().includes('CAN_MANAGE_DEVICE');
        }
      },
    ];
  }

  ngOnInit(): void {
    this.isAdmin = this.storageService.isGaAdmin();
    this.getMerchants();
  }

  toggleCreateDeviceModal() {
    this.showCreateDeviceModal = !this.showCreateDeviceModal;
  }

  updateDeviceState() {
    const payload = {
      id: this.deviceForUpdate.id,
      isActive: !this.deviceForUpdate.isActive
    };

    this.deviceService.changeDeviceStatus(payload).subscribe((res) => {
      this.getDevices();
      this.showDeviceStateModal = !this.showDeviceStateModal;
      this.alertService.success('Device Updated');
      this.ref.markForCheck();
    });
  }

  selectDeviceForUpdate(id) {
    this.tableData$.subscribe(devices => {
      this.deviceForUpdate = devices.find(device => device.id === id);
      this.showDeviceStateModal = !this.showDeviceStateModal;
      if (this.deviceForUpdate.isActive) {
        this.deviceStateModalData.header = "Disable Device";
        this.deviceStateModalData.subHeader = "You are about to disable this device within the platform. Confirm by clicking the 'Disable' button below.";
        this.deviceStateModalData.buttonText = "Disable Device";
      } else {
        this.deviceStateModalData.header = "Enable Device";
        this.deviceStateModalData.subHeader = "You are about to enable this device within the platform. Confirm by clicking the 'Enable' button below.";
        this.deviceStateModalData.buttonText = "Enable Device";
      }
    });
  }

  selectDeviceForReassignment(id) {
    this.tableData$.subscribe(devices => {
      this.deviceToReassign = devices.find(device => device.id === id);
      this.showDeviceReassignModal = true;
      this.deviceReassignForm[0].options = this.merchantsForAssignmentFormOptions;
      this.deviceReassignForm[0].defaultValue = this.deviceToReassign.merchant;
    });
  }

  reAssignDevice() {
    const { merchant } = this.assignmentForm.form.value;

    if (!merchant) {
      this.alertService.error("Please select a merchant");
      return;
    }
    const newMerchantCode = this.merchants.find(merch => merch.name === merchant)?.code;

    if (!newMerchantCode) {
      this.alertService.error("Please select a valid merchant");
      return;
    }

    const payload = {
      "newMerchantCode": newMerchantCode,
      "deviceIdentifier": this.deviceToReassign.identifier
    }
    this.deviceService.reAssignDevice(payload).subscribe({
      next: (res) => {
        this.showDeviceReassignModal = false;
        this.alertService.success("Device Reassigned");
        this.getDevices();
        this.ref.markForCheck();
      }
    })
  }

  getMerchants() {
    this.subscriptions.push(
      this.merchantsService.getMerchants().subscribe((res) => {
        let store = [];
        let assignmentMerchants = [];
        this.merchants = res['data'];
        res['data'].forEach((merchant) => {
          store.push([merchant.name, `${merchant.id}`]);
        });
        res['data'].forEach((merchant) => {
          assignmentMerchants.push([merchant.name, merchant.name]);
        });
        this.merchantsFormOptions = new Map(store);
        this.merchantsForAssignmentFormOptions = new Map(assignmentMerchants);
      })
    );
  }

  getDevices() {
    const { deviceType, identifier } = this.filterValues;
    const response$ = this.deviceService.fetchAllDevices(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
      {
        deviceType,
        identifier
      }
    );

    this.count$ = response$.pipe(map((res) => res.recordsTotal));
    this.tableData$ = response$.pipe(map((res) => res.data));
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex = 0;
    this.paginationValues.currentPage = 1;
    this.getDevices();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getDevices();
  }

  generateCsv() {
    // Get count from count$
    let count: number;
    this.subscriptions.push(this.count$.subscribe((res) => (count = res)));

    const { deviceType, identifier } = this.filterValues;

    this.subscriptions.push(
      this.deviceService
        .fetchAllDevices(0, count, {
          deviceType,
          identifier
        })
        .pipe(
          map((res) => {
            let csvData = [];

            res.data.forEach((el) => {
              const {
                id,
                merchant,
                identifier,
                typeOfDevice,
                isActive,
                createdOn,
                enrollmentStatus,
                updatedOn
              } = el;

              const dump = {
                id,
                merchant,
                identifier,
                typeOfDevice,
                isActive,
                createdOn,
                enrollmentStatus,
                updatedOn
              };

              csvData.push(dump);
            });

            return csvData;
          })
        )
        .subscribe((res) => {
          this.fileService.generateCSV(
            res,
            "Devices",
            this.downloadCSvheaders
          );
        })
    );
  }

}
