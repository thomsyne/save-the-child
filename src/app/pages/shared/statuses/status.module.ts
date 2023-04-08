import { SharedModule } from './../shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StatusComponent } from './components/status/status.component';
import { StatusRoutingModule } from './status-routing.module';
@NgModule({
  declarations: [
    StatusComponent
  ],
  imports: [
    CommonModule,
    StatusRoutingModule,
    SharedModule
  ],
})
export class StatusModule {}
