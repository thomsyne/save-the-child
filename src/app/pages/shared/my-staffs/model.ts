export interface Role {
  active: boolean;
  category: string;
  createdOn: string;
  id: number;
  name: string;
  permissions: string[];
  updatedOn: string;
}

export interface ObservedStaff {
  action: any;
  appReference: string;
  created_at: string;
  description: string;
  feedback: any;
  id: string;
  identity: string;
  owner: string;
  signature: string;
  what: string;
  when: string;
}

export interface Staff {
  activatedOn: string;
  active: true
  createdOn: string;
  currentStore: string;
  email: string;
  firstName: string;
  id: number;
  lastLogin: string;
  lastName: string;
  merchantCode: string;
  phoneNumber:  string;
  roleCategory: string;
  updatedOn: string;
  userRole: string;
  username:  string;
  countryCode?: string;
}

export interface StaffBalance {
  availableBalance: number,
  ledgerBalance: number,
  accountDetails: {
    userReference: string,
    bankCode: any,
    bankAccountNumber: any,
    accountType: string,
    active: boolean;
  }
}
