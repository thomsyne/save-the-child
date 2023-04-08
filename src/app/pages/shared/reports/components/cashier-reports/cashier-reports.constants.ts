import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";
import { defaultDateFilterValues } from "src/app/core/constants/constants";

export const filters: Filter[] = [
  {
    displayName: "First Name",
    filterName: "firstName",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Last Name",
    filterName: "lastName",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Start Date",
    filterName: "startDate",
    type: FilterFormat.DATE,
    // defaultValue: defaultDateFilterValues.startDate
  },
  {
    displayName: "End Date",
    filterName: "endDate",
    type: FilterFormat.DATE,
    // defaultValue: defaultDateFilterValues.endDate
  },
];

export const cashierTableSettings: ColumnSetting[] = [
  {
    primaryKey: "firstName",
    header: "First Name",
  },
  {
    primaryKey: "lastName",
    header: "Last Name",
  },
  {
    primaryKey: "currentStore",
    header: "Shop",
  },
  {
    primaryKey: "totalAmount",
    header: "Total Sales Amount",
    format: PipeFormat.CURRENCY
  },
  {
    primaryKey: "totalCount",
    header: "Total Sales Count",
  },
  {
    primaryKey: "cashPaymentValue",
    header: "Cash Payments Value",
    format: PipeFormat.CURRENCY
  },
  {
    primaryKey: "cashPaymentCount",
    header: "Cash Payments Count",
  },
];

export const downloadCSvheaders: string[] = [
  "First Name",
  "Last Name",
  "Shop",
  "Total Sales Done",
  "Cash Payments Count",
  "Cash Payments Value",
  "Card Payments Count",
  "Card Payments Value",
];
