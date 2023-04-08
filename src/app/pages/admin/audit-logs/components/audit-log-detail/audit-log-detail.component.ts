import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuditLogDetails } from '../../model';
import { AuditLogsService } from '../../services/audit-logs.service';

@Component({
  selector: 'app-audit-log-detail',
  templateUrl: './audit-log-detail.component.html',
  styleUrls: ['./audit-log-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuditLogDetailComponent implements OnInit {

  logId: number;
  logDetails$: any;
  newData: any;
  oldData: any;
  valueKeys: string[] = [];

  keys = []
  constructor(
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private auditLogsService: AuditLogsService,
  ) { }

  ngOnInit(): void {
    this.logId = this.route.snapshot.params['id'];
    this.getLogDetail();
  }


  getLogDetail() {
    this.auditLogsService.fetchSingleLogDetail(this.logId).subscribe(res => {
      this.logDetails$ = res;

      this.newData = JSON.parse(res.newValue);
      this.oldData = JSON.parse(res.oldValue);

      if (this.newData && (typeof this.newData === 'object')){

        this.valueKeys = Object.keys(this.newData)
        this.valueKeys.forEach((e) => {
          if ( (typeof this.newData[e] !== 'object') && this.newData[e] == this.oldData[e]){
            delete this.newData[e]
            delete this.oldData[e]
          }

          if (typeof this.newData[e] === 'object'){
            if (JSON.stringify(this.newData[e]) == JSON.stringify(this.oldData[e])){
              delete this.newData[e]
              delete this.oldData[e]
            }
          }
        })

        this.newData = JSON.stringify(this.newData, null, 1)
        this.oldData = JSON.stringify(this.oldData, null, 1)

        // if (this.newData.SubscriptionPlan){
        //   this.newData = {
        //     ...this.newData,
        //     //SubscriptionPlan: JSON.parse(this.newData.SubscriptionPlan)
        //     ...this.newData.SubscriptionPlan
        //   }
        //   delete this.newData['SubscriptionPlan']
        // }

        // if (this.oldData.SubscriptionPlan){
        //   this.oldData = {
        //     ...this.oldData,
        //     //SubscriptionPlan: JSON.parse(this.oldData.SubscriptionPlan)
        //     ...this.oldData.SubscriptionPlan
        //   }
        //   delete this.oldData['SubscriptionPlan']
        // }

        // this.executeDatePiping(this.newData)
        // this.executeDatePiping(this.oldData)


        // console.log(this.newData)
        // console.log(this.oldData)
      }

      this.ref.detectChanges()

    })
  }

  // executeDatePiping(data: any){
  //   var datePipe = new DatePipe('en-US');

  //   if (data?.StartDate){
  //     data.StartDate = datePipe.transform(data.StartDate, 'MMM d, y, h:mm:ss a')
  //   }
  //   if (data?.NextPaymentDate){
  //     data.NextPaymentDate = datePipe.transform(data.NextPaymentDate, 'MMM d, y, h:mm:ss a')
  //   }
  //   if (data?.LastPaymentDate){
  //     data.LastPaymentDate = datePipe.transform(data.LastPaymentDate, 'MMM d, y, h:mm:ss a')
  //   }
  //   if (data?.ActivatedOn){
  //     data.ActivatedOn = datePipe.transform(data.ActivatedOn, 'MMM d, y, h:mm:ss a')
  //   }
  //   if (data?.NextSubscriptionDate){
  //     data.NextSubscriptionDate = datePipe.transform(data.NextSubscriptionDate, 'MMM d, y, h:mm:ss a')
  //   }
  //   if (data?.CreatedOn){
  //     data.CreatedOn = datePipe.transform(data.CreatedOn, 'MMM d, y, h:mm:ss a')
  //   }
  //   if (data?.UpdatedOn){
  //     data.UpdatedOn = datePipe.transform(data.UpdatedOn, 'MMM d, y, h:mm:ss a')
  //   }
  // }

}
