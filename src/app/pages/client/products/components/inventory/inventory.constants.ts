import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "Category Name",
    filterName: "name",
    type: FilterFormat.TEXT_FIELD,
  },
];

export const inventoryTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Product Name",
  },
  {
    primaryKey: "updatedOn",
    header: "Expiry Date",
    format: PipeFormat.DATE
  },
  {
    primaryKey: "createdOn",
    header: "Create Date",
    format: PipeFormat.DATE
  },
  {
    primaryKey: "isActive",
    header: "In Stock",
  },
  {
    primaryKey: "isActive",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "ID",
  "CATEGORY NAME",
  "DESCRIPTION",
  "MERCHANT ID",
  "MERCHANT NAME",
  "DATE CREATED",
  "DATE UPDATE",
  "STATUS",
];
