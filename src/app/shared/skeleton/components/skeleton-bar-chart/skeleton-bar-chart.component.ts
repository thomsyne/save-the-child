import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-skeleton-bar-chart',
  templateUrl: './skeleton-bar-chart.component.html',
  styleUrls: ['./skeleton-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonBarChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
