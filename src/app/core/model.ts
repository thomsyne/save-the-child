export interface MsalGraphResponse {
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users/$entity";
  businessPhones: string[];
  displayName: string;
  givenName: string;
  id: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: string;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
}

export interface LoggedInUserObject {
  jsonWebToken: JsonWebToken;
  userDetails: UserDetails;
  hasCompletedOnBoarding: boolean;
  invoiceViewModel?: any;
}

export interface UserDetails {
  roleCategory: string;
  userRole: string;
  permissions: string[];
  phoneNumber: string;
  firstName: string;
  lastName: string;
  active: boolean;
  activatedOn: string;
  merchant?: any;
  currentStore?: any;
  email: string;
  lastLogin: string;
  username: string;
  id: number;
  createdOn: string;
  updatedOn: string;
}

interface JsonWebToken {
  accessToken: string;
  refreshToken: string;
  expires: number;
}

export interface XTokenResponse {
  username: string;
  accessToken: string;
  accessSecret: string;
  validTill: number;
}

export interface LoginClientCredentials {
  merchant: string;
  password: string;
  username: string;
}

export interface Merchant {
  address: string;
  activatedOn: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
  name: string;
  code: string;
  contactEmail: string;
  contactPhoneNumber: string;
  currency: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  startDate: string;
  nextPaymentDate: string;
  lastPaymentDate: string;
  active: boolean;
  logoUrl: string;
  currentSubscriptionPlan: CurrentSubscriptionPlan;
  cycleLength: number;
  totalCycles: number;
  totalPayment: number;
  paymentCycle: string;
  cacNumber: string;
  natureOfBusiness: string;
  taxIdentificationNumber: string;
  bankVerificationNumber: string;
  metaData?: any;
  id: number;
  createdOn: string;
  updatedOn: string;
  allowDiscount?: boolean;
  entityCode?: string;
}

export interface CurrentSubscriptionPlan {
  name: string;
  fee: number;
  maxNumberOfStores: number;
  maxNumberOfUsers: number;
  maxNumberOfPOSDevices: number;
  maxNumberOfOtherDevices: number;
  paymentCycle: string;
  trialPeriodDays: number;
  active: boolean;
  id: number;
  type: "lease" | "outright" | "mobile";
  createdOn: string;
  updatedOn: string;
}

export interface UpcomingSubscriptionDetails {
  amount: number;
  merchant: string;
  reference: string;
  paymentStatus: string;
  dueDate: string;
  nextRun: string;
  periodStart: string;
  periodEnd: string;
  auto: boolean;
  paymentMethod?: any;
  paymentDate?: any;
  maskedCardNumber?: any;
  cardHolderName?: any;
  stan?: any;
  authCode?: any;
  retrievalRefNumber?: any;
  responseCode?: any;
  responseDescription?: any;
  providerReference?: any;
  retryCount: number;
  subscriptionName: string;
  quantity: number;
  status: string;
  id: number;
  createdOn: string;
  updatedOn: string;
}

export interface Order {
  device: string;
  orderNumber: string;
  soldBy: string;
  totalQuantity: number;
  totalAmount: number;
  paymentMethod: string;
  currency: string;
  customer: string;
  orderDate: Date;
  store: string;
  paymentStatus: string;
  discount: number;
  discountType: string;
  maskedCardNumber: string;
  cardHolderName: string;
  stan: string;
  authCode: string;
  retrievalRefNumber: string;
  responseCode: string;
  responseDescription: string;
  items: OrderItem[];
  latitude: number;
  longitude: number;
  orderStatus: string;
  merchantName: string;
  id: number;
  createdOn: Date;
  updatedOn: Date;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  id: number;
  createdOn: Date;
  updatedOn: Date;
}

export interface OnboardMerchant {
  stage: string;
  code: string;
  name: string;
  address: string;
  contactEmail: string;
  countryCode: string;
  contactPhoneNumber: string;
  currency: string;
  cacNumber: string;
  subscriptionPlan: string;
  subscriptionType: string;
  natureOfBusiness: string;
  taxIdentificationNumber: string;
  bank: {
    bankCode: string;
    accountNumber: string;
    name: string;
  };
  admin: {
    firstname: string;
    lastname: string;
    countryCode: string;
    phone: string;
    email: string;
    bank: {
      bankVerificationNumber: string;
    };
  };
  devices: {
    paymentCycle: number;
    count: number;
  };
  isBankMerchant?: boolean;
  entityCode?: string;

  identityType?: string;
  photoLink?: string;
  identityLink?: string;
  utilityLink?: string;
  businessRegLink?: string;
  residentPermitLink?: string;

}

export interface Invoice {
  id: number;
  createdOn: string;
  updatedOn: string;
  amount: number;
  merchant: string;
  reference: string;
  paymentStatus: string;
  dueDate: string;
  nextRun: string;
  periodStart: string;
  periodEnd: string;
  auto: boolean;
  paymentMethod: string;
  paymentDate: string;
  maskedCardNumber: string;
  cardHolderName: string;
  stan: string;
  authCode: string;
  retrievalRefNumber: string;
  responseCode: string;
  responseDescription: string;
  providerReference: string;
  retryCount: number;
  subscriptionName: string;
  quantity: number;
  status: string;
}

export interface Payment {
  reference: string;
  callbackUrl: string;
}

export class BankValidation {
  status: boolean;
  data: {
    accountNumber: string;
    name: string;
    sortCode: string;
  };
}

export interface TableDataResponse<T> {
  data: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageIndex: number;
  pageSize: number;
  recordsFiltered: number;
  recordsTotal: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  succeeded: boolean;
}

export interface AccountLookup {
  accountNumber: string;
  accountName: string;
  bankName: string;
}

export interface EntityList {
  currency: string;
  name: string;
  code: string;
  logo: string;
  receiptLogo: string;
  baseWebUrl: string;
  countryCode: string;
  phoneCode: string;
  status: string;
  subscriptionAllow: string;
  currencyAllow: boolean;
  settlementBankCode: string;
  settlementAccount: string;
  provider: string;
  settlementBank: string;
  settlementType: string;
  isActive?: boolean;
  hasDefaultedGAPayment?: boolean
}


export interface BankList {

  code: string,
  otherCode: string,
  instantCode: string,
  countryCode: string,
  status: string,
  name: string,
  logo:string

}

export interface PayAdvance {
  merchantId: number,
  numberOfRenewals: number,
}

export interface VirtualTransfer {
  amount: string,
  invoiceReference?: string,
  customerId: string,
  currency: string
}
