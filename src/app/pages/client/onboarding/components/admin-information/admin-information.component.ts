import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form/dynamic-form.component';
import { adminInformationDetails, errors } from './admin-information.constants';

@Component({
  selector: 'app-admin-information',
  templateUrl: './admin-information.component.html',
  styleUrls: ['./admin-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminInformationComponent implements OnInit {

  @Input() saveAdminInfoLoading: boolean;
  @ViewChild("adminInformationForm", { static: false }) adminInformationForm: DynamicFormComponent;

  informationFormDetails = adminInformationDetails;
  errors = errors;

  @Input() saveBusInfoLoading = false;
  @Output() goBack = new EventEmitter();
  @Output() proceed = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
