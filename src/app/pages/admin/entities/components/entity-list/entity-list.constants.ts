import { ColumnSetting, Filter, FilterFormat } from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "Country Code",
    filterName: "countryCode",
    type: FilterFormat.SELECT
  },
];

export const entityTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Entity Name",
  },
  {
    primaryKey: "code",
    header: "Entity Code",
  },
  {
    primaryKey: "currency",
    header: "Currency",
  },
  {
    primaryKey: "isActive",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "NAME",
  "CODE",
  "BASE WEB URL",
  "COUNTRY CODE",
  "STATUS",
  "SUBSCRIPTION ALLOWED",
  "SETTLEMENT BANK CODE",
  "SETTLEMENT ACCOUNT",
  "PROVIDER",
  "SETTLEMENT BANK",
  "SETTLEMENT TYPE",
  "IS ACTIVE"
];
