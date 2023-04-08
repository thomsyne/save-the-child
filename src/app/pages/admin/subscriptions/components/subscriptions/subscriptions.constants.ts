import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "Plan Name",
    filterName: "name",
    type: FilterFormat.TEXT_FIELD,
  },
];

export const subscriptionsTableSettings: ColumnSetting[] = [
  {
    primaryKey: "name",
    header: "Name",
  },
  {
    primaryKey: "type",
    header: "Type",
  },
  {
    primaryKey: "fee",
    header: "Fee",
    format: PipeFormat.CURRENCY
  },
  {
    primaryKey: "maxNumberOfStores",
    header: "No of Stores",
  },
  {
    primaryKey: "maxNumberOfPOSDevices",
    header: "No of POS Devices",
  },
  {
    primaryKey: "maxNumberOfOtherDevices",
    header: "No of other Devices",
  },
  {
    primaryKey: "active",
    header: "Status",
  },
  {
    primaryKey: "paymentCycle",
    header: "Date",
  },
];

export const downloadCSvheaders: string[] = [
  "NAME",
  "FEE",
  "MAX NUMBER OF STORES",
  "MAX NUMBER OF USERS",
  "MAX NUMBER OF POS DEVICES",
  "MAX NUMBER OF DEVICES",
  "PAYMENT CYCLE",
  "TRIAL PERIOD(DAYS)",
  "TYPE",
  "ACTIVE",
  "ID",
  "CREATED ON",
  "UPDATED ON",
];
