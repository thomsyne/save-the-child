import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";
import { ModalMetaData } from "@ga/modal";

export const productOptionModalData: ModalMetaData = {
  modalType: "primary",
  header: "New Product",
  subHeader: "Create a single product or multiple products at once.",
  // buttonText: "Close",
};





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
    displayName: "Product Category",
    filterName: "categoryId",
    type: FilterFormat.SELECT,
  },
  // {
  //   displayName: "Can Expire",
  //   filterName: "expiry",
  //   type: FilterFormat.SELECT,
  //   options: new Map([
  //     ["YES", "true"],
  //     ["NO", "false"],
  //   ]),
  // },
];

export const managementTableSettings: ColumnSetting[] = [
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
    primaryKey: "createdOn",
    header: "Created On",
    format: PipeFormat.DATE,
  },
  {
    primaryKey: "isActive",
    header: "Status",
  },
];

export const downloadCSvheaders: string[] = [
  "PRODUCT NAME",
  "PRODUCT CODE",
  "CATEGORY",
  "PRICE",
  "CREATED ON",
  "UPDATED ON",
  "STATUS",
  "STOCK TRACKING ENABLED",
  "ACTION ON LOW STOCK",
  "MINIMUM STOCK",
  "IMAGE URL",
];
