import { ColumnSetting, Filter, FilterFormat, PipeFormat } from "@ga/dynamic-table";

export const entityOrdersTableSettings: ColumnSetting[] = [
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
