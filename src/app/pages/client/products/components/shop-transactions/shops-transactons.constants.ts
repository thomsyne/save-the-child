import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";
import { defaultDateFilterValues } from "src/app/core/constants/constants";

export const filters: Filter[] = [
  {
    displayName: "Order Number",
    filterName: "orderNumber",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Payment Type",
    filterName: "paymentType",
    type: FilterFormat.SELECT,
    options: new Map([
      ["CASH", "CASH"],
      ["CARD", "CARD"],
    ]),
  },
  {
    displayName: "Payment Status",
    filterName: "paymentStatus",
    type: FilterFormat.SELECT,
    options: new Map([
      ["SUCCESS", "SUCCESS"],
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

export const shopTransactionsTableSettings: ColumnSetting[] = [
  {
    primaryKey: "orderNumber",
    header: "Order Number",
  },
  {
    primaryKey: "orderDate",
    header: "Order Date",
    format: PipeFormat.DATE
  },
  {
    primaryKey: "transactionReference",
    header: "Transaction Ref",
  },
  {
    primaryKey: "paymentMethod",
    header: "Payment",
  },
  {
    primaryKey: "soldBy",
    header: "Cashier",
  },
];

export const downloadCSvheaders: string[] = [
  "ORDER NUMBER",
  "ORDER DATE",
  "TRANSACTION REF",
  "PAYMENT MODE",
  "CASHIER",
  "DISCOUNT",
  "FINAL PRICE",
];
