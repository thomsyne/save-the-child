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
    displayName: "Dispute Category",
    filterName: "category",
    type: FilterFormat.SELECT,
    options: new Map([
      ["Billing", "Billing"],
      ["Settlement", "Settlement"],
      ["Order", "Order"],
    ]),
  },
  {
    displayName: "Status",
    filterName: "status",
    type: FilterFormat.SELECT,
    options: new Map([
      ["Resolved", "Resolved"],
      ["Rejected", "Rejected"],
      ["Open", "Open"],
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

export const complaintsTableSettings: ColumnSetting[] = [
  {
    primaryKey: "reference",
    header: "Dispute Ref",
  },
  {
    primaryKey: "createdBy",
    header: "Merchant Name",
  },
  {
    primaryKey: "category",
    header: "Category",
  },
  {
    primaryKey: "createdOn",
    header: "Created On",
    format: PipeFormat.DATE,
  },
  {
    primaryKey: "updatedOn",
    header: "Updated On",
    format: PipeFormat.DATE,
  },
  {
    primaryKey: "status",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "REFERENCE",
  "STATUS",
  "CATEGORY",
  "CREATED ON",
  "CREATED BY",
  "UPDATED ON"
];
