import { LabelledDropdownParameters } from "@ga/utility";

export const filterParameters: LabelledDropdownParameters = {
  items: [
    { key: "24 Hours", value: 1 },
    { key: "7 Days", value: 7 },
    { key: "30 Days", value: 30 },
  ],
  label: "Filter by",
  current: 30
};

export interface Subscriptions {
  active: number;
  inActive: number;
  total: number;
}

export interface MerchantDash {
  active: number
  inActive: number
  total: number
}

