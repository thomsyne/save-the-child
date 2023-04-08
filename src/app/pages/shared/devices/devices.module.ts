import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableModule } from '@ga/dynamic-table';
import { SkeletonModule } from '@ga/skeleton';
import { UtilityModule } from '@ga/utility';
import { DevicesRoutingModule } from './devices-routing.module';

import { DevicesContainerComponent } from './components/devices-container/devices-container.component';
import { DevicesComponent } from './components/devices/devices.component';
import { DynamicFormModule } from '@ga/dynamic-form';
import { ModalModule } from '@ga/modal';
import { CreateDeviceComponent } from './components/create-device/create-device.component';

@NgModule({
  declarations: [
    DevicesContainerComponent,
    DevicesComponent,
    CreateDeviceComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    DynamicTableModule,
    UtilityModule,
    SkeletonModule,
    DynamicFormModule,
    ModalModule
  ]
})
export class DevicesModule { }
