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
    displayName: "Payment Status",
    filterName: "paymentStatus",
    type: FilterFormat.SELECT,
    options: new Map([
      ["SUCCESS", "SUCCESS"],
      ["FAILED", "FAILED"],
    ]),
  },
  {
    displayName: "Payment Type",
    filterName: "paymentType",
    type: FilterFormat.SELECT,
    options: new Map([
      ["CARD", "CARD"],
      ["CASH", "CASH"],
      ["ONLINEUSSD", "ONLINEUSSD"]
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

export const salesReportsTableSettings: ColumnSetting[] = [
  {
    primaryKey: "orderNumber",
    header: "Order No.",
  },
  {
    primaryKey: "store",
    header: "Store",
  },
  {
    primaryKey: "totalAmount",
    header: "Price",
    format: PipeFormat.CURRENCY,
  },
  {
    primaryKey: "soldBy",
    header: "Cashier",
  },
  {
    primaryKey: "customer",
    header: "Customer",
  },
  {
    primaryKey: "paymentMethod",
    header: "Channel"
  },
  {
    primaryKey: "paymentStatus",
    header: "Status",
  },
  {
    primaryKey: "createdOn",
    header: "Date & Time",
    format: PipeFormat.DATE
  },
];

export const downloadCSvheaders: string[] = [
  "ORDER NUMBER",
  "PRODUCTS",
  "STORE",
  "PRICE",
  "CASHIER",
  "DATE AND TIME",
  "CUSTOMER",
  "PAYMENT TYPE",
  "PAYMENT STATUS",
];


