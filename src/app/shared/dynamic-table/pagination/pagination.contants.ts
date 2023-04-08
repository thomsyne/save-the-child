import { LabelledDropdownParameters } from "@ga/utility";

export const pageSizeDropdownParameters: LabelledDropdownParameters = {
  label: "Items per page",
  items: [
    {
      key: "10 Items",
      value: 10,
    },
    {
      key: "20 Items",
      value: 20,
    },
    {
      key: "30 Items",
      value: 30,
    },
    {
      key: "40 Items",
      value: 40,
    },
    {
      key: "50 Items",
      value: 50,
    },
  ],
};

export enum PaginationType {
  PAGEDTYPE,
  NEXTTYPE
}
