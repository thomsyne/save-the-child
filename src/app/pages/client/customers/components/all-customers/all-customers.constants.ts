import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "Customer Name",
    filterName: "fullName",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Email Address",
    filterName: "email",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Phone Number",
    filterName: "phoneNumber",
    type: FilterFormat.TEXT_FIELD,
  },
];

export const customersTableSettings: ColumnSetting[] = [
  {
    primaryKey: "fullName",
    header: "Customer Name",
  },
  {
    primaryKey: "email",
    header: "Email Address",
  },
  {
    primaryKey: "mobileNumber",
    header: "Phone Number",
  },
  {
    primaryKey: "isActive",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "ID",
  "FULL NAME",
  "PHONE NUMBER",
  "EMAIL",
  "ACTIVE",
  // "RECEIVE RECEIPT",
];
