import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { FileUploadMetadata } from '@ga/file-upload';
import { LoaderComponent, AlertService } from '@ga/utility';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UploadService } from 'src/app/core/services/upload.service';
import { BankService } from '../../services/bank.service';
import { logoFileUploadMetadata, createBankForm, createBankErrors } from './create-bank.constants';

@Component({
  selector: 'app-create-bank',
  templateUrl: './create-bank.component.html',
  styleUrls: ['./create-bank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBankComponent implements OnInit {

  @ViewChild("createBankForm", { static: false })
  createBankForm: DynamicFormComponent;
  @ViewChild(LoaderComponent, { static: true })
  loader: LoaderComponent;

  uploadFields = logoFileUploadMetadata;
  uploadedFileUrls: any[] = [];
  selectedFile!: File;

  form = createBankForm;
  errors = createBankErrors;

  buttonDisabled: ButtonState = "INVALID";

  subscriptions: Subscription[] = [];

  constructor(
    private bankService: BankService,
    private alertService: AlertService,
    private router: Router,
    private readonly uploadService: UploadService
  ) {}

  ngOnInit() {}

  createBank() {

    let payload = this.createBankForm.form.value;

    let { baseWebUrl, phoneCode, status } = this.createBankForm.form.value;

    baseWebUrl = window.location.href.replace('/banks/create', '');
    phoneCode = payload.countryCode;
    status =  'Active';

    payload = {
      ...payload,
      baseWebUrl,
      phoneCode    }

    this.bankService.postCreateBank(payload).subscribe((response: any) => {
      if (response.succeeded){
        this.alertService.success(`${payload.name} created successfully`);
        this.router.navigate(['/banks'])
      }
    })
  }

  uploadDocument(event: File, item: FileUploadMetadata, index: number) {
    this.selectedFile = event;
    const formData: FormData = new FormData();

    formData.append('File', this.selectedFile);

    this.uploadService
      .singleDocumentUpload(formData)
      .pipe(first())
      .subscribe((res: any) => {

          this.createBankForm.form.patchValue({
            logo: res.data.documentLink
          })

        this.selectedFile = null;
        const formData: FormData = new FormData();

        this.alertService.success("Attachment uploaded successfully");
      });

  }

  onFileDeleted(item: number) {
    this.uploadedFileUrls[item] = "";
  }

}
