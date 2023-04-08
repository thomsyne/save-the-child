import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexDataLabels, ApexFill, ApexStroke, ApexLegend, ApexTooltip, ApexPlotOptions, ApexAxisChartSeries, ApexYAxis, ApexXAxis, ApexNoData } from 'ng-apexcharts'


export type ChartOptions = {
  labels: any;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  noData: ApexNoData;
  colors: string[]
}

export interface DonutChartOptions extends ChartOptions {

  series: ApexNonAxisChartSeries;

}

export interface BarChartOptions extends ChartOptions {
  series: ApexAxisChartSeries;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
}

export type ChartParameters = {
  chartId: string;
  chartLabels: string[];
  chartLabelValues: number[];
  chartColors: string[];
  thinBorder?: boolean;
  chartRepresents: string;
  prefix?: string;
}

export interface BarChartParameters extends ChartParameters {
  yAxisLabel: string;
  xAxisLabels: string[];
  data: number[][];
  count?: number;
}
