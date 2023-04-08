import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '@ga/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { AlertService } from '@ga/utility';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Complaint } from '../..';
import { ComplaintsService } from '../../services/complaints.service';
import { commentFormFields, rejectFormFileds, resolveFormFileds } from './complaint-info.constants';

@Component({
  selector: 'app-complaint-info',
  templateUrl: './complaint-info.component.html',
  styleUrls: ['./complaint-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintInfoComponent implements OnInit, OnDestroy {

  @ViewChild("commentFormRef", { static: false }) comentFormData!: DynamicFormComponent;
  @ViewChild("rejectFormRef", { static: false }) rejectFormData!: DynamicFormComponent;
  @ViewChild("resolveFormRef", { static: false }) resolveFormData!: DynamicFormComponent;

  complaintId: number;
  complaintData: Complaint;
  complaint$: Observable<Complaint>;
  isAdmin = false;

  commentForm = commentFormFields;
  rejectForm = rejectFormFileds;
  resolveForm = resolveFormFileds;

  showRejectModal = false;
  showResolveModal = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private alertService: AlertService,
    private complaintsService: ComplaintsService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.storageService.isGaAdmin();
    this.complaintId = this.activatedRoute.snapshot.params["id"];
    this.getComplaintDetails(this.complaintId);
  }

  getComplaintDetails(complaintId: number) {
    this.complaint$ = this.complaintsService.fetchSingleComplaint(complaintId);
    this.complaint$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => this.complaintData = res,
    })
  }

  toggleRejectModal() {
    this.showRejectModal = !this.showRejectModal;
  }

  toggleResolveModal() {
    this.showResolveModal = !this.showResolveModal;
  }

  sendComment() {
    const { comment } = this.comentFormData.form.value;
    const payload = {
      "disputeId": this.complaintId,
      "comment": comment,
    };

    this.complaintsService.addCommentToComplaint(this.complaintId, payload).subscribe({
      next: (res) => {
        this.alertService.success("Comment added successfully");
        this.ref.markForCheck();
        this.comentFormData.form.reset();
        this.getComplaintDetails(this.complaintId);
      }
    })
  }

  rejectComplaint() {
    const { description } = this.rejectFormData.form.value;

    const payload = {
      id: this.complaintId,
      resolution: description,
      status: "Rejected"
    };

    this.complaintsService.resolveRejectComplaint(this.complaintId, payload).subscribe({
      next: (res) => {
        this.toggleRejectModal();
        this.alertService.success("Complaint rejected successfully");
        this.ref.markForCheck();
        this.complaint$ = this.complaintsService.fetchSingleComplaint(this.complaintId);
      }
    });
  }

  resolveComplaint() {
    const { description } = this.resolveFormData.form.value;

    const payload = {
      id: this.complaintId,
      resolution: description,
      status: "Resolved"
    };

    this.complaintsService.resolveRejectComplaint(this.complaintId, payload).subscribe({
      next: (res) => {
        this.alertService.success("Complaint resolved successfully");
        this.toggleResolveModal();
        this.ref.markForCheck();
        this.complaint$ = this.complaintsService.fetchSingleComplaint(this.complaintId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
