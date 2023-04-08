import { CustomCurrencyPipe } from './../utility/custom-currency.pipe';
import { NgModule } from "@angular/core";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  PercentPipe,
} from "@angular/common";
import { DynamicTableComponent } from "./dynamic-table/dynamic-table.component";
import { FormatCellPipe } from "./format-cell.pipe";
import { PaginationComponent } from "./pagination/pagination.component";
import { StyleCellDirective } from "./style-cell.directive";
import { FiltersComponent } from "./filters/filters.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DownloadCsvComponent } from "./download-csv/download-csv.component";
import { UtilityModule } from "@ga/utility";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    DynamicTableComponent,
    FormatCellPipe,
    StyleCellDirective,
    PaginationComponent,
    FiltersComponent,
    DownloadCsvComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UtilityModule,
  ],
  exports: [
    DynamicTableComponent,
    PaginationComponent,
    FiltersComponent,
    DownloadCsvComponent,
  ],
  providers: [CurrencyPipe, DatePipe, PercentPipe, CustomCurrencyPipe],
})
export class DynamicTableModule {}
