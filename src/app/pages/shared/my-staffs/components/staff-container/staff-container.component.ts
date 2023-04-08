import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute, StorageService } from '@ga/core';
import { Observable } from 'rxjs';
import { StaffsService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-container',
  templateUrl: './staff-container.component.html',
  styleUrls: ['./staff-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffContainerComponent extends CurrentRoute implements OnInit {

  title$: Observable<string>;

  constructor(
    router: Router,
    private storageService: StorageService,
    private staffService: StaffsService
  ) {
    super(router);
    this.title$ = this.staffService.currentComponentTitle;
  }

  ngOnInit() {
    if (this.storageService.isGaAdmin()) {
      this.staffService.changeComponentTitle('Users');
    } else {
      this.staffService.changeComponentTitle('Staff');
    }
  }
}


