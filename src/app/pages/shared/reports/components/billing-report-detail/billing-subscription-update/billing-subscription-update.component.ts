import { AlertService } from '@ga/utility';
import { ReportsService } from './../../../services/reports.service';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { SubscriptionUpdate } from '../../../model';
import { errors, subscriptionUpdateForm, subscriptionUpdateModalData } from './billing-subscription-update.constants';

@Component({
  selector: 'app-billing-subscription-update',
  templateUrl: './billing-subscription-update.component.html',
  styleUrls: ['./billing-subscription-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingSubscriptionUpdateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DynamicFormComponent, { static: true })
  form: DynamicFormComponent;

  @Input() invoiceData: Partial<SubscriptionUpdate>;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = subscriptionUpdateModalData;
  subscriptionUpdateForm = subscriptionUpdateForm;
  errors = errors;
  buttonDisabled: ButtonState = "INVALID";
  subscriptions: Subscription[] = [];

  constructor(
    private readonly alertService: AlertService,
    private readonly reportService: ReportsService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Subscribe to form validation status
    this.subscriptions.push(
      this.form.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  updateSubscription(){
    this.alertService.warn('Update in progress. Please wait...')
    const { paymentMethod, retrievalRefNumber, paymentDate } = this.form.form.value;
    const { id, amount } = this.invoiceData

    const payload: SubscriptionUpdate = {
      id,
      amount,
      paymentMethod,
      paymentStatus: "Success",
      retrievalRefNumber,
      paymentDate: new Date(paymentDate).toISOString()
    }

    this.subscriptions.push(
      this.reportService.subscriptionUpdate(payload).subscribe((res) => {
        this.alertService.success(res.message)
        this.closeModal.emit()
        this.refreshData.emit()
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
