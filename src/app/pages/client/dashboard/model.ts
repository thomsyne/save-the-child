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

export interface PaymentMethod {
  name: string;
  sum?: number;
  count: number;
  value?: number;
}

export interface DashboardProduct {
  product: string;
  productId: number;
  totalAmount: number;
  totalQuantity: number;
}

export interface DashboardCashier {
  currentStore: string;
  firstName: string;
  lastName: string;
  totalAmount: number;
  totalCount: number;
  totalItems: number;
  userId: number;
}


export interface DashboardCustomer {
  customerId: number;
  fullName: string;
  totalAmount: number;
  totalCount: number;
  totalItems: number;
}
