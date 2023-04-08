import { Injectable } from "@angular/core";
import { DonutChartOptions, BarChartOptions } from "./model";

@Injectable({
  providedIn: "root",
})
export class ChartsService {
  constructor() {}

  createDonutChart(
    values: number[],
    labels: string[],
    colors: string[]
  ): Partial<DonutChartOptions> {
    const options: Partial<DonutChartOptions> = {
      series: values,
      tooltip: {
        fillSeriesColor: true,
      },
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      fill: { colors },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    return options;
  }

  createBarChart(
    data: number[][],
    xAxisLabels: string[],
    yAxisLabel: string,
    barChartColors: string[]
  ): Partial<BarChartOptions> {
    console.log(data);

    const series = data.map((entry) => {
      return { name: "", data: entry };
    });

    const options: Partial<BarChartOptions> = {
      series,
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
        },
      },
      noData: {
        text: "No data available",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#ed1c25",
          fontSize: "14px",
          fontFamily: "Poppins R",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: xAxisLabels,
      },
      yaxis: {
        title: {
          text: yAxisLabel,
        },
      },
      fill: {
        opacity: 1,
        colors: barChartColors,
      },
    };

    return options;
  }
}
