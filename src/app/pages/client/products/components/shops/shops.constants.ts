import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "Shop Name",
    filterName: "name",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Store ID",
    filterName: "systemName",
    type: FilterFormat.TEXT_FIELD,
  },
];

export const shopsTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Shop Name",
  },
  {
    primaryKey: "systemName",
    header: "Store ID",
  },
  {
    primaryKey: "createdOn",
    header: "Created On",
    format: PipeFormat.DATE,
  },
  {
    primaryKey: "updatedOn",
    header: "Updated On",
    format: PipeFormat.DATE,
  },
  {
    primaryKey: "active",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "SHOP NAME",
  "DESCRIPTION",
  "ACTIVE",
  "MERCHANT NAME",
  "SYSTEM NAME",
  "ADDRESS",
  "ID",
  "CREATED ON",
  "UPDATED ON",
];
