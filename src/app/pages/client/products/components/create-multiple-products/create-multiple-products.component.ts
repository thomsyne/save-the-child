import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { FileGenerationService } from '@ga/dynamic-table';
import { AlertService } from '@ga/utility';
import { BulkUpdateResponse } from '../../model';
import { ProductService } from '../../services/products.service';
import { productOptionModalData } from './create-mulitple-products.constants';

declare var $: any;
@Component({
  selector: 'app-create-multiple-products',
  templateUrl: './create-multiple-products.component.html',
  styleUrls: ['./create-multiple-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMultipleProductsComponent implements OnInit {

  showMultipleProductCreateModal: boolean;
  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  modalData = productOptionModalData;
  
  fileToBeUploaded: File;
  progressPercent: number;
  uploadResponse: BulkUpdateResponse;
  uploadFinished: boolean;
  hasErrorr
  templateLoading: boolean = false;

  constructor(
    private alertService: AlertService,
    private productService: ProductService,
    private ref: ChangeDetectorRef,
    private fileService: FileGenerationService
  ) { }

  ngOnInit(): void {
  }

  toggleShowProductCreateOptionModal() {
    this.closeModal.emit();
  }

  async addAttachment(event) {
    if (!event.target.files[0]) return;

    this.fileToBeUploaded = <File>event.target.files[0];

    if (!this.fileToBeUploaded.name.endsWith(".csv")) {
      return this.alertService.info("Invalid File Format", true);
    }

    let formData = new FormData();
    formData.append("request", this.fileToBeUploaded);

    this.productService.productBulkUpload(formData).subscribe(
      (event) => {

        if (event.numberOfFailed) {
          this.uploadResponse = event;
          this.uploadFinished = true;
        }

        if (event.numberOfSuccess) {
          this.uploadFinished = true;
          this.refreshData.emit();
          this.toggleShowProductCreateOptionModal();
        }
        this.ref.markForCheck();
      },
      (err) => {
        this.toggleShowProductCreateOptionModal();
        this.fileToBeUploaded = null;
        this.ref.markForCheck();
      }
    );
  }

  generateCSV() {
    this.templateLoading = true;
    this.productService.getUploadTemplateHeaders().subscribe(
      (res) => {
        const headers = res.headers.split(',');
        this.templateLoading = false;

        this.fileService.generateCSV(
          [],
          "TEMPLATE(BULK PRODUCT CREATION)",
          headers
        );
        this.ref.markForCheck();
      },
      (err) => {
        this.templateLoading = false;
        this.alertService.error(err, true);
      }
    );
  }

}
