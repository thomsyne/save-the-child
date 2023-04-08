export interface Customer {
  createdBy: string;
  createdOn: string;
  email: string;
  fullName: string;
  id: number;
  isActive: boolean;
  mobileNumber: string;
  receiveEReceipt: boolean;
  updatedOn: string;
  countryCode?: string;
}

export interface OrderItem {
  createdOn: string;
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  updatedOn: string;
}
export interface CustomerOrder {
  applicationVersion: string;
  authCode: string;
  cardHolderName: string;
  createdOn: string;
  currency: string;
  customer: string;
  device: string;
  discount: number;
  discountType: string;
  id: number;
  items?: OrderItem[];
  latitude: number;
  longitude: number;
  maskedCardNumber: number;
  orderDate: string;
  orderNumber: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  responseCode: string;
  responseDescription: string;
  retrievalRefNumber: number;
  soldBy: string;
  stan: string;
  store: string;
  totalAmount: number;
  totalQuantity: number;
  transactionReference: string;
  updatedOn: string;
  ussd: string;
}

