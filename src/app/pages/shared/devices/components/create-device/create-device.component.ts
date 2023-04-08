import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { MerchantsService } from 'src/app/pages/admin/merchants/services/merchants.service';
import { Device } from '../..';
import { DeviceService } from '../../services/devices.service';
import { createDeviceForm, createDeviceModalData, errors } from './create-device.constants';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateDeviceComponent implements OnInit, AfterViewInit {

  @Input() merchantsFormOptions: any;
  @ViewChild(DynamicFormComponent, { static: true })
  form: DynamicFormComponent;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = createDeviceModalData;
  createDeviceForm = createDeviceForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  constructor(
    private devicesService: DeviceService,
    private merchantsService: MerchantsService
  ) { }

  ngOnInit(): void {
    this.createDeviceForm[1].options = this.merchantsFormOptions;
  }


  ngAfterViewInit() {
    // Subscribe to form validation status
    this.subscriptions.push(
      this.form.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  createDevice() {
    const { identifier, merchant } =
    this.form.formValues;

    const createForm: Partial<Device> = {
      identifier,
      merchantId: merchant,
      deviceType: "POS"
    };

    this.devicesService.addDevice(createForm).subscribe(
      (res) => {
        this.closeModal.emit();
        this.refreshData.emit();
      });
  }
}
