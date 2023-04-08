import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DonutChartComponent } from "./donut-chart/donut-chart.component";

import { NgApexchartsModule } from "ng-apexcharts";
import { BarChartComponent } from "./bar-chart/bar-chart.component";

@NgModule({
  declarations: [DonutChartComponent, BarChartComponent],
  imports: [CommonModule, NgApexchartsModule],
  exports: [DonutChartComponent, BarChartComponent],
})
export class ChartModule {}
