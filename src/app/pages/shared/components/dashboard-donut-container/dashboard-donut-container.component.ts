import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartParameters } from '@ga/charts';

@Component({
  selector: 'dashboard-donut-container',
  templateUrl: './dashboard-donut-container.component.html',
  styleUrls: ['./dashboard-donut-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDonutContainerComponent implements OnInit {

  @Input('params') chartParameters: ChartParameters;
  @Input("colors") colors: string[]

  constructor() { }

  ngOnInit() {
    console.log('data sent here again', this.chartParameters);
  }

}
