export interface Merchant {
  accountName: string;
  accountNumber: string;
  activatedOn: string;
  active: boolean;
  address: string;
  bankCode: string;
  bankVerificationNumber: string;
  cacNumber: string;
  code: string;
  contactEmail: string;
  contactPhoneNumber: string;
  createdOn: string;
  currency: string;
  currentSubscriptionPlan: SubscriptionPlan;
  cycleLength: number;
  id: number;
  lastPaymentDate: string;
  logoUrl: null;
  name: string;
  natureOfBusiness: string;
  nextPaymentDate: string;
  paymentCycle: string;
  startDate: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  taxIdentificationNumber: string;
  totalCycles: number;
  totalPayment: number;
  updatedOn: string;
  isBankMerchant?: boolean;
  countryCode?: string;

  identityType?: string;
  photoLink?: string;
  identityLink?: string;
  utilityLink?: string;
  businessRegLink?: string;
  residentPermitLink?: string;
}

export interface SubscriptionPlan {
  active: boolean;
  createdOn: string;
  fee: number;
  id: number;
  maxNumberOfOtherDevices: number;
  maxNumberOfPOSDevices: number;
  maxNumberOfStores: number;
  maxNumberOfUsers: number;
  name: string;
  paymentCycle: string;
  trialPeriodDays: number;
  type: string;
  updatedOn: string;
}

export interface OTPPayload {
  id: number;
  status: string;
  success: boolean;
}
