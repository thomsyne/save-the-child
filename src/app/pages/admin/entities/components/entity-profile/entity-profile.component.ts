import { Router } from '@angular/router';
import { UploadService } from './../../../../../core/services/upload.service';
import { EntityList } from './../../../../../core/model';
import { errors } from './../../../../client/onboarding/components/business-information/business-information.constants';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { LoggedInUserObject, StorageService, ApiResponse, allBanks } from '@ga/core';
import { ButtonState } from '@ga/dynamic-table';
import { ModalMetaData } from '@ga/modal';
import { Subscription, Observable } from 'rxjs';
import { Merchant } from '../../../merchants';
import { EntityService } from '../../services/entity.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@ga/utility';
import { SubscriptionsService } from '../../../subscriptions/services/subscriptions.service';
import { merchantFileUploadMetadata, updateEntityForm } from './entity-profile.constants';
import { FileUploadMetadata } from '@ga/file-upload';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-entity-profile',
  templateUrl: './entity-profile.component.html',
  styleUrls: ['./entity-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityProfileComponent implements OnInit {
  @ViewChild("entityProfileForm", { static: false })
  entityProfileForm: DynamicFormComponent;

  entityForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  subscriptionsPlans;
  displayForm: boolean;
  code: string;
  entity$: Observable<ApiResponse<EntityList>>;
  entity: EntityList;
  uploadFields = merchantFileUploadMetadata;
  uploadedFileUrls: any[] = [];
  selectedFile!: File;

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private uploadService: UploadService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.code = this.route.snapshot.params["code"];
    this.getEntityDetail();
  }

  getEntityDetail(){
    this.entity$ = this.entityService.fetchSingleEntity(this.code);
    this.entity$.subscribe((res) => {
      this.displayForm = true;
      this.entity = res.data;

      updateEntityForm[0].defaultValue = res.data.name
      updateEntityForm[1].defaultValue = res.data.baseWebUrl
      updateEntityForm[2].defaultValue = res.data.countryCode
      updateEntityForm[3].defaultValue = res.data.currency
      updateEntityForm[4].defaultValue = res.data.settlementBankCode
      updateEntityForm[5].defaultValue = res.data.settlementAccount
      updateEntityForm[6].defaultValue = res.data.provider
      updateEntityForm[7].defaultValue = res.data.settlementType
      updateEntityForm[8].defaultValue = res.data.subscriptionAllow
      updateEntityForm[9].defaultValue = res.data.isActive
      updateEntityForm[10].defaultValue = res.data.hasDefaultedGAPayment
      updateEntityForm[11].defaultValue = res.data.logo
      updateEntityForm[12].defaultValue = res.data.receiptLogo

      this.entityForm = updateEntityForm
      this.ref.markForCheck();
    })
  }

  updateEntity(){
    const {
      name,
      baseWebUrl,
      countryCode,
      currency,
      settlementBankCode,
      settlementAccount,
      provider,
      settlementBank,
      settlementType,
      subscriptionAllow,
      isActive,
      hasDefaultedGAPayment,
      logo,
      receiptLogo
    } = this.entity

    const formValues = this.entityProfileForm.form.value;
    const payload: Partial<EntityList> = {
      name,
      baseWebUrl,
      countryCode,
      currency,
      settlementBankCode,
      settlementAccount,
      provider,
      settlementBank: allBanks.find((a) => a.Code == settlementBankCode)?.name || '' ,
      settlementType,
      subscriptionAllow,
      isActive,
      hasDefaultedGAPayment,
      phoneCode: countryCode ,
      logo,
      receiptLogo,
      status: formValues.isActive ? 'Active' : "Inactive",
      ...formValues
    };

    this.entityService.updateSingleEntity(payload).subscribe((res) => {
      this.alertService.success("Entity updated successfully");
      this.router.navigate(['/entities'])
    });

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
          this.entityProfileForm.form.patchValue({
            logo: res.data.documentLink
          })
        } else {
          this.entityProfileForm.form.patchValue({
            receiptLogo: res.data.documentLink
          })
        }

        this.selectedFile = null;
        const formData: FormData = new FormData();

        this.alertService.success("Attachment uploaded successfully");
      });

  }

  onFileDeleted(item: number) {
    this.uploadedFileUrls[item] = "";
  }

}
