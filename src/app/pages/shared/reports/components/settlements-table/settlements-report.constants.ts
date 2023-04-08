import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";
import { defaultDateFilterValues } from "src/app/core/constants/constants";

export const filters: Filter[] = [
  {
    displayName: "Reference",
    filterName: "reference",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Payment Status",
    filterName: "status",
    type: FilterFormat.SELECT,
    options: new Map([
      ["SUCCESS", "SUCCESS"],
      ["PENDING", "PENDING"],
      ["FAILED", "FAILED"],
    ]),
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

export const settlementsReportsTableSettings: ColumnSetting[] = [
  {
    primaryKey: "reference",
    header: "Reference"
  },
  {
    primaryKey: "merchantName",
    header: "Merchant Name"
  },
  {
    primaryKey: "initiatedBy",
    header: "Initiated By",
  },
  {
    primaryKey: "amount",
    header: "Amount",
    format: PipeFormat.CURRENCY,
  },
  {
    primaryKey: "createdOn",
    header: "Transaction Date",
    format: PipeFormat.DATE
  },
  {
    primaryKey: "updatedOn",
    header: "Last Updated",
    format: PipeFormat.DATE
  },
  {
    primaryKey: "status",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "REFERENCE",
  "MERCHANT NAME",
  "TRANSACTION DATE",
  "INITIATED BY",
  "AMOUNT",
  "LAST UPDATED",
  "STATUS",
];
