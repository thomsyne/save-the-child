import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";
import { defaultDateFilterValues } from "src/app/core/constants/constants";

export const filters: Filter[] = [
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
  {
    displayName: "Merchant Name",
    filterName: "merchantName",
    type: FilterFormat.TEXT_FIELD,
    // defaultValue: defaultDateFilterValues.endDate
  },
];

export const billingsTableSettings: ColumnSetting[] = [
  {
    primaryKey: "createdOn",
    header: "Initiated On",
    format: PipeFormat.DATE
  },
  {
    primaryKey: "paymentDate",
    header: "Payment Date",
    format: PipeFormat.DATE
  },
  {
    primaryKey: "merchant",
    header: "Merchant",
  },
  {
    primaryKey: "subscriptionName",
    header: "Plan Name",
  },
  {
    primaryKey: "reference",
    header: "Merchant Ref",
  },
  {
    primaryKey: "amount",
    header: "Amount",
    format: PipeFormat.CURRENCY
  },
  {
    primaryKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    primaryKey: "status",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "MERCHANT NAME",
  "SUBSCRIPTION NAME",
  "TRANSACTION DATE",
  "PAYMENT DATE",
  "REFERENCE",
  "AMOUNT",
  "STATUS",
];
