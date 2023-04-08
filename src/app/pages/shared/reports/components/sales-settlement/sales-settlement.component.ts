import { AlertService } from '@ga/utility';
import { ReportsService } from './../../services/reports.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FileUploadMetadata } from '@ga/file-upload';
import { first } from 'rxjs/operators';
import { documentUploadMetadata } from './sales-settlement.constants';
import { ManualCardSettlement } from '../../model';

@Component({
  selector: 'app-sales-settlement',
  templateUrl: './sales-settlement.component.html',
  styleUrls: ['./sales-settlement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesSettlementComponent implements OnInit {
  selectedFile!: File;
  documentUploadMetadata = documentUploadMetadata;
  formData: FormData;
  isUploadSuccessful: boolean = false

  resultTable: ManualCardSettlement[] = [
    {
        orderNumber: null,
        totalAmount: 0,
        orderDate: "0001-01-01T00:00:00Z",
        store: null,
        merchantCode: null,
        transactionId: 200037,
        retrievalRefNumber: "227807110124",
        message: "Duplicate Manual card settlement entry For transaction: '200037'"
    },
    {
        orderNumber: null,
        totalAmount: 0,
        orderDate: "0001-01-01T00:00:00Z",
        store: null,
        merchantCode: null,
        transactionId: 200238,
        retrievalRefNumber: "227807120125",
        message: "An error occurred while updating the entries. See the inner exception for details."
    },
    {
      orderNumber: null,
      totalAmount: 0,
      orderDate: "0001-01-01T00:00:00Z",
      store: null,
      merchantCode: null,
      transactionId: 200037,
      retrievalRefNumber: "227807110124",
      message: "Duplicate Manual card settlement entry For transaction: '200037'"
  },
  {
      orderNumber: null,
      totalAmount: 0,
      orderDate: "0001-01-01T00:00:00Z",
      store: null,
      merchantCode: null,
      transactionId: 200238,
      retrievalRefNumber: "227807120125",
      message: "An error occurred while updating the entries. See the inner exception for details."
  },
  {
    orderNumber: null,
    totalAmount: 0,
    orderDate: "0001-01-01T00:00:00Z",
    store: null,
    merchantCode: null,
    transactionId: 200037,
    retrievalRefNumber: "227807110124",
    message: "Duplicate Manual card settlement entry For transaction: '200037'"
},
{
    orderNumber: null,
    totalAmount: 0,
    orderDate: "0001-01-01T00:00:00Z",
    store: null,
    merchantCode: null,
    transactionId: 200238,
    retrievalRefNumber: "227807120125",
    message: "An error occurred while updating the entries. See the inner exception for details."
},
{
  orderNumber: null,
  totalAmount: 0,
  orderDate: "0001-01-01T00:00:00Z",
  store: null,
  merchantCode: null,
  transactionId: 200037,
  retrievalRefNumber: "227807110124",
  message: "Duplicate Manual card settlement entry For transaction: '200037'"
},
{
  orderNumber: null,
  totalAmount: 0,
  orderDate: "0001-01-01T00:00:00Z",
  store: null,
  merchantCode: null,
  transactionId: 200238,
  retrievalRefNumber: "227807120125",
  message: "An error occurred while updating the entries. See the inner exception for details."
},
{
  orderNumber: null,
  totalAmount: 0,
  orderDate: "0001-01-01T00:00:00Z",
  store: null,
  merchantCode: null,
  transactionId: 200037,
  retrievalRefNumber: "227807110124",
  message: "Duplicate Manual card settlement entry For transaction: '200037'"
},
{
  orderNumber: null,
  totalAmount: 0,
  orderDate: "0001-01-01T00:00:00Z",
  store: null,
  merchantCode: null,
  transactionId: 200238,
  retrievalRefNumber: "227807120125",
  message: "An error occurred while updating the entries. See the inner exception for details."
}
]

  constructor(
    private readonly alertService: AlertService,
    private readonly ref: ChangeDetectorRef,
    private readonly reportService: ReportsService
  ) { }

  ngOnInit() {
  }

  uploadDocument(event: File, item: FileUploadMetadata) {
    this.selectedFile = event;
    this.formData = new FormData();

    this.formData.append('formFile', this.selectedFile);
    this.alertService.warn('File Selected. Proceed to upload')
  }

  executeUpload(){
    this.alertService.clear()
    this.alertService.warn('Upload in progress, please wait...')
    this.reportService
    .manualCardSettlement(this.formData)
    .pipe(first())
    .subscribe((res: any) => {
      this.resultTable = res
      this.isUploadSuccessful = true
      this.ref.detectChanges()
      this.selectedFile = null;
      this.formData = new FormData();

      this.alertService.success("Attachment uploaded successfully. See Results in table.");
    });
  }

  resetAll(){
    window.location.reload()
  }

}
