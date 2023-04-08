import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-skeleton-dashboard-table',
  templateUrl: './skeleton-dashboard-table.component.html',
  styleUrls: ['./skeleton-dashboard-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonDashboardTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
