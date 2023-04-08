import { ColumnSetting, Filter, FilterFormat } from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "Country Code",
    filterName: "countryCode",
    type: FilterFormat.SELECT
  },
];

export const bankTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Bank Name",
  },
  {
    primaryKey: "code",
    header: "Bank Code",
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
  "STATUS"
];
