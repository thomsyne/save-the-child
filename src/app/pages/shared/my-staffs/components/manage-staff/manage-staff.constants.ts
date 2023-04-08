import {
  ColumnSetting,
  Filter,
  FilterFormat,
  PipeFormat,
} from "@ga/dynamic-table";

export const filters: Filter[] = [
  {
    displayName: "First Name",
    filterName: "firstName",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Last Name",
    filterName: "lastName",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Role Name",
    filterName: "UserRole",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Email Address",
    filterName: "Email",
    type: FilterFormat.TEXT_FIELD,
  },
  {
    displayName: "Merchant Code",
    filterName: "code",
    type: FilterFormat.TEXT_FIELD,
  },
];

export const manageUsersTableSettings: ColumnSetting[] = [
  {
    primaryKey: "firstName",
    header: "First Name",
  },
  {
    primaryKey: "lastName",
    header: "Last Name",
  },
  {
    primaryKey: "email",
    header: "Email Address",
  },
  {
    primaryKey: "userRole",
    header: "Role Name",
  },
  {
    primaryKey: "active",
    header: "Status",
  },
  {
    primaryKey: "merchantCode",
    header: "Store",
  },
];

export const downloadCSvheaders: string[] = [
  "FIRST NAME",
  "LAST NAME",
  "PHONE NUMBER",
  "EMAIL",
  "USERNAME",
  "CURRENT STORE",
  "ROLE NAME",
  "ACTIVE",
];
