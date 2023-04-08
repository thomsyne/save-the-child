import { allBanks } from './../../../../../core/constants/constants';
import { first, takeUntil } from 'rxjs/operators';
import { UploadService } from "./../../../../../core/services/upload.service";
import { EntityService } from "./../../services/entity.service";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from "@angular/core";
import { DynamicFormComponent } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { AlertService, LoaderComponent } from "@ga/utility";
import { Subscription } from "rxjs";
import {
  createEntityErrors,
  createEntityForm,
  logoFileUploadMetadata,
} from "./create-entity.constants";
import { Router } from "@angular/router";
import { FileUploadMetadata } from "@ga/file-upload";

@Component({
  selector: "app-create-entity",
  templateUrl: "./create-entity.component.html",
  styleUrls: ["./create-entity.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEntityComponent implements OnInit {
  @ViewChild("createEntityForm", { static: false })
  createEntityForm: DynamicFormComponent;
  @ViewChild(LoaderComponent, { static: true })
  loader: LoaderComponent;

  uploadFields = logoFileUploadMetadata;
  uploadedFileUrls: any[] = [];
  selectedFile!: File;

  form = createEntityForm;
  errors = createEntityErrors;

  buttonDisabled: ButtonState = "INVALID";

  subscriptions: Subscription[] = [];

  constructor(
    private entityService: EntityService,
    private alertService: AlertService,
    private router: Router,
    private readonly uploadService: UploadService
  ) {}

  ngOnInit() {}

  createEntity() {

    let payload = this.createEntityForm.form.value;

    let { baseWebUrl, phoneCode, status, settlementBank } = this.createEntityForm.form.value;

    baseWebUrl = window.location.href.replace('/entities/create', '/');
    phoneCode = payload.countryCode;
    status =  payload.isActive ? 'Active' : 'Inactive';
    settlementBank = allBanks.find((a) => a.Code == payload.settlementBankCode)?.name || ''

    payload = {
      ...payload,
      baseWebUrl,
      phoneCode,
      status,
      settlementBank
    }

    this.entityService.postCreateEntity(payload).subscribe((response: any) => {
      if (response.succeeded){
        this.alertService.success(`${payload.name} created successfully`);
        this.router.navigate(['/entities'])
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

        if (item.name === 'logo' ){
          this.createEntityForm.form.patchValue({
            logo: res.data.documentLink
          })
        } else {
          this.createEntityForm.form.patchValue({
            receiptLogo: res.data.documentLink
          })
        }

        this.selectedFile = null;
        const formData: FormData = new FormData();

        this.alertService.success("Attachment uploaded successfully");
      });

  }

  onFileDeleted(item: FileUploadMetadata){
    this.selectedFile = null;
    const formData: FormData = new FormData();

    let res = {
      data : {
        documentLink: ''
      }
    }

    if (item.name === 'logo' ){
      this.createEntityForm.form.patchValue({
        logo: res.data.documentLink
      })
    } else {
      this.createEntityForm.form.patchValue({
        receiptLogo: res.data.documentLink
      })
    }
  }
}
