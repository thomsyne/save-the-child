import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { StorageService } from '@ga/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StaffsService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-control',
  templateUrl: './staff-control.component.html',
  styleUrls: ['./staff-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffControlComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  title: string = '';
  controllers = []

  constructor(
    private staffService: StaffsService,
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.staffService.currentComponentTitle
      .pipe(takeUntil(this.destroy$))
      .subscribe(componentTitle => {
        this.title = componentTitle;
        this.controllers = [
          {
            title: `Add/Manage ${this.title}`,
            text: `Manage ${this.title.toLowerCase()} under you eg. Cashiers, Accountants, and so on.`,
            route: "/staff/manage",
            permission: this.storageService.isGaAdmin() ? 'CAN_VIEW_ALL_USER' : 'CAN_VIEW_USER',
            img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__bank.svg"
          },
          {
            title: `${this.title} Roles`,
            text: `Create a type of ${this.title.toLowerCase()} eg. Cashier, and specify what he/she can do.`,
            route: "/staff/permissions",
            permission: 'CAN_VIEW_ROLES',
            img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__file.svg"
          },
        ]

        if (!this.storageService.isGaAdmin()) {
          this.controllers.push({
            title: `Observe My ${this.title}`,
            text: "Performance reports on the cashiers in your shops.",
            route: "/staff/observe",
            permission: this.storageService.isGaAdmin() ? 'CAN_VIEW_ALL_USER' : 'CAN_VIEW_USER',
            img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__pos__terminal.svg"
          })
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
