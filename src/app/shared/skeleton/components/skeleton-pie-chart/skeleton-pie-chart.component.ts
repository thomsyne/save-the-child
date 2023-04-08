import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-skeleton-pie-chart',
  templateUrl: './skeleton-pie-chart.component.html',
  styleUrls: ['./skeleton-pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonPieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
