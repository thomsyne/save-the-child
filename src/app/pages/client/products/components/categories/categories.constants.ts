
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

export const categoriesTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Category Name",
  },
  {
    primaryKey: "createdOn",
    header: "Create Date",
    format: PipeFormat.DATE
  },
  {
    primaryKey: "updatedOn",
    header: "Updated Date",
    format: PipeFormat.DATE
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
