import { Router } from '@angular/router';
import { AlertService } from '@ga/utility';
import { StatusService } from './../../services/status.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CurrentPaymentStatus } from '../../model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent implements OnInit {
  type: string;
  statusDetails: CurrentPaymentStatus

  isSuccess: boolean = true;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private statusService: StatusService
  ) {
    this.statusService.currentStatus.subscribe((response) => {
      if (response){
        this.statusDetails = response
      } else {
        this.router.navigate(['/dashboard/client'])
      }
    })
   }

  ngOnInit() {
    this.type = this.route.parent.snapshot.params["type"];
    this.isSuccess = this.type == 'success' ? true : false;
  }

  routeUser(){
    this.router.navigate([this.statusDetails.callback || ''])
  }

}
