import { Field, FieldType, Error } from "@ga/dynamic-form";
import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";
import { ModalMetaData } from "@ga/modal";
import { defaultDateFilterValues } from "src/app/core/constants/constants";

export const increaseQuantityFormFields: Field[] = [
  {
    name: "quantity",
    displayValue: "Additional Quantity",
    type: FieldType.NUMBERFIELD,
  },
  {
    name: "reason",
    type: FieldType.TEXTAREA,
  },
];

export const reduceQuantityFormFields: Field[] = [
  {
    name: "quantity",
    displayValue: "Quantity to Reduce",
    type: FieldType.NUMBERFIELD,
  },
  {
    name: "reason",
    type: FieldType.TEXTAREA,
  },
];

export const expiryDateFormFields: Field[] = [
  {
    name: "expiryDate",
    type: FieldType.DATEPICKER,
  },
  // {
  //   name: "reason",
  //   type: FieldType.TEXTAREA,
  // },
];

export const filters: Filter[] = [
  {
    displayName: "Product Name",
    filterName: "name",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Product Code",
    filterName: "code",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Dispute Category",
    filterName: "category",
    type: FilterFormat.SELECT,
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

export const shopInventoryTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Product Name",
  },
  {
    primaryKey: "code",
    header: "Product Code",
  },
  {
    primaryKey: "categoryName",
    header: "Category",
  },
  {
    primaryKey: "price",
    header: "Price",
    format: PipeFormat.CURRENCY,
  },
  {
    primaryKey: "quantity",
    header: "In Stock",
  },
  {
    primaryKey: "isActive",
    header: "Status",
  },
  {
    primaryKey: "createdOn",
    header: "Created On",
    format: PipeFormat.DATE,
  },
];

export const downloadCSvheaders: string[] = [
  "ID",
  "NAME",
  "CODE",
  "DESCRIPTION",
  "PRICE",
  "STOCK TRACKING",
  "ACTION ON LOW STOCK",
  "ACTIVE",
  "CATEGORY NAME",
  "MINIMUM STOCK",
  "CREATED ON",
  "UPDATED ON",
  "QUANTITY",
  "IMAGE URL",
  "LOW STOCK",
];

export const errors: Error[] = [
  {
    name: "required",
    text: "This field is required",
    rules: ["dirty"],
  },
];
