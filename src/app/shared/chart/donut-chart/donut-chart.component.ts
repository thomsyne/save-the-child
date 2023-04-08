import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { ChartParameters, DonutChartOptions } from "../model";
import { ChartsService } from "../charts.service";

@Component({
  selector: "lib-donut-chart",
  templateUrl: "./donut-chart.component.html",
  styleUrls: ["./donut-chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonutChartComponent implements OnInit, OnChanges {
  @Input("params") chartParameters: ChartParameters;
  @Input("colors") colors: string[]

  @ViewChild("donutChart", { static: false }) chart: DonutChartComponent;
  public donutChartOptions: Partial<DonutChartOptions>;

  constructor(
    private charts: ChartsService,
    private ref: ChangeDetectorRef
    ) {}

  getTotal() {
    return this.chartParameters.chartLabelValues.reduce((prev, sum) => {
      return prev + sum;
    });
  }

  retrievePercentages() {
    const percentages = [];
    this.chartParameters.chartLabelValues.forEach((value) => {

      let nValue = Number(((value / this.getTotal()) * 100).toFixed(2))

      percentages.push(
        value == 0 ? 0 : nValue
      );
    });

    return percentages;
  }

  ngOnInit() {
    console.log(this.retrievePercentages());

    if (this.chartParameters != undefined) {
      this.donutChartOptions = this.charts.createDonutChart(
        this.retrievePercentages(),
        this.chartParameters.chartLabels,
        this.chartParameters.chartColors
      );

      if (this.chartParameters.thinBorder) {
        this.donutChartOptions.plotOptions = {
          pie: {
            donut: {
              labels: {
                show: true,
              },
              size: "99%",
            },
          },
        };
      }
      this.donutChartOptions.dataLabels = {
        enabled: true,
        formatter: function (val) {
          return (Number(val).toFixed(2)) + "%"
        },
        textAnchor: "middle",
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold",
          colors: ['#FFF', '#FFF', '#FFF', '#FFF'],
        },
      };
      this.donutChartOptions.colors = this.colors
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartParameters = changes.chartParameters.currentValue;
    this.ngOnInit()
  }
}
