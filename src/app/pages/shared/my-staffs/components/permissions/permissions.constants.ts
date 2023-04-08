import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "Role Name",
    filterName: "Name",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Role Category",
    filterName: "Category",
    type: FilterFormat.TEXT_FIELD,
  },
];

export const permissionsTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Role Name",
  },
  {
    primaryKey: "category",
    header: "Role Category",
  },
  {
    primaryKey: "active",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "ROLE NAME",
  "ROLE CATEGORY",
  "STATUS",
];
