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
      ["Card", "Cash"],
      ["Cash", "Cash"],
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

export const orderTableSettings: ColumnSetting[] = [
  {
    primaryKey: "orderNumber",
    header: "Order No",
  },
  {
    primaryKey: "orderDate",
    header: "Order Date",
    format: PipeFormat.DATE
  },
  {
    primaryKey: "soldBy",
    header: "Cashier",
  },
  {
    primaryKey: "totalAmount",
    header: "Amount",
  },
  {
    primaryKey: "totalQuantity",
    header: "Quantity",
  },
  {
    primaryKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    primaryKey: "paymentStatus",
    header: "Payment Status",
  },
];

export const downloadCSvheaders: string[] = [
  "ID",
  "DEVICE",
  "ORDER NUMBER",
  "SOLD BY",
  "TOTAL QUANTITY",
  "TOTAL AMOUNT",
  "PAYMENT METHOD",
  "CURRENCY",
  "CUSTOMER",
  "ORDER DATE",
  "STORE",
  "PATMENT STATUS",
  "DISCOUNT",
  "DISCOUNT TYPE",
  "MASKED CARD NUMBER",
  "CARD HOLDER NAME",
  "STAN",
  "AUTH CODE",
  "RRN",
  "RESPONSE CODE",
  "RESPONSE DESCRIPTION",
];
