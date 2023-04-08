import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "Csutomer Name",
    filterName: "name",
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

export const managementTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Customer Name",
  },
  {
    primaryKey: "email",
    header: "Email Address",
  },
  {
    primaryKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    primaryKey: "isActive",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "CUSTOMER NAME",
  "EMAIL ADDRESS",
  "PHONE NUMBER",
  "STATUS",
];
