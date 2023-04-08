import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "Name",
    filterName: "name",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Code",
    filterName: "code",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Subscription Plan",
    filterName: "subscriptionPlan",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Subscription Type",
    filterName: "subscriptionType",
    type: FilterFormat.SELECT,
    options: new Map([
      ["Outright", "outright"],
      ["Lease", "lease"],
      ["Mobile", "mobile"],
    ]),
  },
  {
    displayName: "Validation Status",
    filterName: "pendingValidation",
    type: FilterFormat.SELECT,
    options: new Map([
      ["Validated", "validated"],
      ["Pending Validation", "pendingValidation"],
    ]),
  },
];

export const merchantsTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Name",
  },
  {
    primaryKey: "contactEmail",
    header: "Email Address",
  },
  {
    primaryKey: "contactPhoneNumber",
    header: "Phone Number",
  },
  {
    primaryKey: "code",
    header: "Merchant Code",
  },
  {
    primaryKey: "subscriptionPlan",
    header: "Plan",
  },
  {
    primaryKey: "active",
    header: "Status",
  },
  {
    primaryKey: "createdOn",
    header: "Created On",
    format: PipeFormat.DATE,
  },
];

export const downloadCSvheaders: string[] = [
  "MERCHANT NAME",
  "MERCHANT CODE",
  "EMAIL",
  "PHONE NUMBER",
  "CURREENCY",
  "ACCOUNT NAME",
  "ACCOUNT NUMBER",
  "BANK CODE",
  "ACTIVE",
  "CREATED ON",
  "DATE STARTED",
  "NEXT PAYMENT DATE",
  "DATE UPDATED",
  "SUBSCRIPTION PLAN",
  "SUBSCRIPTION STATUS",
];
