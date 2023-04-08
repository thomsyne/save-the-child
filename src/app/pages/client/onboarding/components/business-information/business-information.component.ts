import { BankService } from './../../../../admin/banks/services/bank.service';
import { AlertService } from './../../../../../shared/utility/alert/alert.service';
import { UploadService } from './../../../../../core/services/upload.service';
import { EntityList } from './../../../../../core/model';
import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { first } from 'rxjs/operators';
import { AccountLookup, AccountService, BankValidation, StorageService } from "@ga/core";
import { DynamicFormComponent } from "src/app/shared/dynamic-form/dynamic-form/dynamic-form.component";
import {
  businessDetailsForm,
  errors,
  accountInformationForm,
  logoFileUploadMetadata,
  identityTypeForm,
} from "./business-information.constants";
import { FileUploadMetadata } from '@ga/file-upload';

@Component({
  selector: "app-business-information",
  templateUrl: "./business-information.component.html",
  styleUrls: ["./business-information.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessInformationComponent {
  @ViewChild("businessDataForm", { static: false })
  businessDataForm: DynamicFormComponent;

  @ViewChild("identityDataForm", { static: false })
  identityDataForm: DynamicFormComponent;

  @ViewChild("bankDataForm", { static: false })
  bankDataForm: DynamicFormComponent;


  businessFormDetails = businessDetailsForm;
  bankInformationFormDetails = accountInformationForm;
  errors = errors;
  totalBanks: number = 500;
  countryCode: string = '';
  bankFormList = []

  @Input() saveBusInfoLoading = false;
  @Output() goBack = new EventEmitter();
  @Output() proceed = new EventEmitter();

  accountDetails: AccountLookup;
  accountLookupFormStatus = false;
  uploadFields = logoFileUploadMetadata;
  identityTypeForm = identityTypeForm
  currentEntity: EntityList

  selectedFile!: File;

  constructor(
    private alertService: AlertService,
    private bankService: BankService,
    private ref: ChangeDetectorRef,
    private uploadService: UploadService,
    private storageService: StorageService
  ) {
    this.currentEntity = storageService.getCurrentEntity()
    storageService.rmvOnboardUserCode();

    this.countryCode = storageService.getCurrentEntity().countryCode?.includes('234') ? 'NG' :
                       storageService.getCurrentEntity().countryCode?.includes('233') ? 'GH' : '';

    this.accountLookupFormStatus = this.countryCode !== 'NG' ? true : false
    this.fetchBanks()

  }

  fetchBanks(){
    this.bankService.fetchAllBanks(0, this.totalBanks, { countryCode: this.countryCode})
      .subscribe((response) => {
        response['data'].forEach((data) => {
          this.bankFormList.push([data.name, data.code]);
        });

        this.ref.detectChanges()
        this.bankFormList.unshift(['- Select Bank -', ''])
        this.bankInformationFormDetails[1].options = new Map(this.bankFormList);
        this.ref.detectChanges()
      })
  }

  getAccountDetails(data: AccountLookup) {
    this.accountDetails = data;
  }

  getAccountLookupFormStatus(status: boolean) {
    this.accountLookupFormStatus = status;
  }

  processForms() {
    //Handle Non-Nigerian Cases
    if (this.countryCode !== 'NG'){
      this.accountDetails = this.bankDataForm.form.value
    }

    const accountInfo = {
      bankCode: this.accountDetails.bankName,
      accountNumber: this.accountDetails.accountNumber,
      accountName: this.accountDetails.accountName,
    };

    const formData = {
      ...this.businessDataForm.form.value,
      ...accountInfo,
      ...this.identityDataForm.form.value,
    };
    this.proceed.emit(formData);
  }

  uploadDocument(event: File, item: FileUploadMetadata, index: number) {
    this.selectedFile = event;
    const formData: FormData = new FormData();

    formData.append('File', this.selectedFile);

    this.uploadService
      .singleDocumentUpload(formData)
      .pipe(first())
      .subscribe((res: any) => {

        this.uploadPatches(item.name, res)

        this.selectedFile = null;
        const formData: FormData = new FormData();

        this.alertService.success("Attachment uploaded successfully");
      });

  }

  uploadPatches(documentName: string, res: any){
    switch(documentName){
      case 'photoLink':
        this.businessDataForm.form.patchValue({
          photoLink: res.data.documentLink
        })
        break;

      case 'identityLink':
        console.log(res.data.documentLink)
        this.businessDataForm.form.patchValue({
          identityLink: res.data.documentLink
        })
        break;

      case 'utilityLink':
        this.businessDataForm.form.patchValue({
          utilityLink: res.data.documentLink
        })
        break;

      case 'businessRegLink':
        this.businessDataForm.form.patchValue({
          businessRegLink: res.data.documentLink
        })
        break;

      case 'residentPermitLink':
        this.businessDataForm.form.patchValue({
          residentPermitLink: res.data.documentLink
        })
        break;

      default:
        break;
    }
  }

  onFileDeleted(item: FileUploadMetadata){
    this.selectedFile = null;
    const formData: FormData = new FormData();

    let res = {
      data : {
        documentLink: ''
      }
    }

    this.uploadPatches(item.name, res)
  }
}
