export interface BillingReport {
  amount: number;
  authCode: any
  auto: false
  cardHolderName: any;
  createdOn: string;
  dueDate: string;
  id: number;
  maskedCardNumber: any;
  merchant: string;
  nextRun: any;
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: string;
  periodEnd: string;
  periodStart: string;
  providerReference: any;
  quantity: number;
  reference: string;
  responseCode: any;
  responseDescription: any;
  retrievalRefNumber: any;
  retryCount: number;
  stan: any;
  status: string;
  subscriptionName: string;
  updatedOn: string;
}

export interface SalesReport {
  applicationVersion: string;
  authCode: any;
  cardHolderName: any;
  createdOn: string;
  currency: string;
  customer: string;
  device: string;
  discount: number;
  discountType: string;
  id: number;
  latitude: number;
  longitude: number;
  maskedCardNumber: any;
  orderDate: string;
  orderNumber: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  responseCode: any;
  responseDescription: any;
  retrievalRefNumber: any;
  soldBy: string;
  stan: any;
  store: string;
  totalAmount: number;
  totalQuantity: number;
  transactionReference: string;
  updatedOn: string;
  ussd: any;
  orderItems?: any;
}
export interface SettlementsReport {
  amount: number;
  createdOn: string;
  currency: string;
  failureReason: string;
  id: number;
  initiatedBy: string;
  merchantName: string;
  reference: string;
  status: string;
  transactionType: string;
  updatedOn: string;
}

export interface CashierReport {
  cardPaymentCount: number;
  cardPaymentValue: number;
  cashPaymentCount: number;
  cashPaymentValue: number;
  currentStore: string;
  firstName: string;
  lastName: string;
  totalAmount: number;
  totalCount: number;
  totalItems: number;
}

export interface SettlementSummary {
  countAllTime: number;
  countLastMonth: number;
  countThisMonth: number;
  countThisYear: number;
  countToday: number;
  countYesterday: number;
  sumAllTime: number;
  sumLastMonth: number;
  sumThisMonth: number;
  sumThisYear: number;
  sumToday: number;
  sumYesterday: number;
}

export interface SettlementBalance {
  availableBalance: number;
  ledgerBalance: number;
  accountDetails: AccountDetails
}


export interface AccountDetails {
  userReference: string;
  bankCode: string;
  bankAccountNumber: string;
  accountType: string;
  active: boolean;
}

export interface SubscriptionUpdate {
  id: number,
  amount: number,
  paymentMethod: string,
  paymentStatus: string,
  retrievalRefNumber: string,
  paymentDate: string | Date
}

export interface ManualCardSettlement {
  orderNumber: any,
  totalAmount: number,
  orderDate: string,
  store: string,
  merchantCode: string,
  transactionId: number,
  retrievalRefNumber: string,
  message: string
}

export interface CorporateEntityOrder extends SalesReport {

}
