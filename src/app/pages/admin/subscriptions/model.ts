export interface SubscriptionModel {
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
};
