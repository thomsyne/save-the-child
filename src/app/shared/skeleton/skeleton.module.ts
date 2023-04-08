import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SkeletonPieChartComponent } from "./components/skeleton-pie-chart/skeleton-pie-chart.component";
import { SkeletonBarChartComponent } from "./components/skeleton-bar-chart/skeleton-bar-chart.component";
import { SkeletonDashboardTableComponent } from "./components/skeleton-dashboard-table/skeleton-dashboard-table.component";
import { SkeletonTableComponent } from "./components/skeleton-table/skeleton-table.component";
import { NoTableDataComponent } from "./components/no-table-data/no-table-data.component";

@NgModule({
  declarations: [
    SkeletonPieChartComponent,
    SkeletonBarChartComponent,
    SkeletonDashboardTableComponent,
    SkeletonTableComponent,
    NoTableDataComponent,
  ],
  imports: [CommonModule],
  exports: [
    SkeletonPieChartComponent,
    SkeletonBarChartComponent,
    SkeletonDashboardTableComponent,
    SkeletonTableComponent,
    NoTableDataComponent,
  ],
})
export class SkeletonModule {}
