import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { Complaint } from '../..';
import { ComplaintsService } from '../../services/complaints.service';
import { createComplaintForm, createComplaintModalData, errors } from './create-complaint.constants';

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html',
  styleUrls: ['./create-complaint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComplaintComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: true })
  form: DynamicFormComponent;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = createComplaintModalData;
  createUserForm = createComplaintForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];

  constructor(
    private complaintsService: ComplaintsService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Subscribe to form validation status
    this.subscriptions.push(
      this.form.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  createComplaint() {
    const { reference, category } =
      this.form.formValues;

      const form: Partial<Complaint> = {
        reference,
        category,
      };

      this.subscriptions.push(
        this.complaintsService.createComplaint(form).subscribe((res) => {
          this.closeModal.emit();
          this.refreshData.emit();
        })
      );
  }

}
