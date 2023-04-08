import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import {
  ColumnSetting,
  Filter,
  FilterFormat,
} from "@ga/dynamic-table";
import { ModalMetaData } from "@ga/modal";

export const changeDeviceStateModalData: ModalMetaData = {
  modalType: "primary",
  header: "",
  subHeader: "You are about to disable this device within the platform. Confirm by clicking the 'Disable' button below.",
  buttonText: "Disable Device",
};

export const filters: Filter[] = [
  {
    displayName: "Device Type",
    filterName: "deviceType",
    type: FilterFormat.SELECT,
    options: new Map([
      ["All", "All"],
      ["POS", "POS"],
      ["Others", "Others"],
    ]),
  },
  {
    displayName: "Device Id",
    filterName: "identifier",
    type: FilterFormat.TEXT_FIELD,
  },
];

export const devicesTableSettings: ColumnSetting[] = [
  {
    primaryKey: "identifier",
    header: "Device ID",
  },
  {
    primaryKey: "merchant",
    header: "Merchant",
  },
  {
    primaryKey: "typeOfDevice",
    header: "Type Of Device",
  },
  {
    primaryKey: "isActive",
    header: "Status",
  },
];


export const reAssignFormFields: Field[] = [
  {
    name: "merchant",
    displayValue: "Assign to merchant (Optional)",
    type: FieldType.SELECTDROPDOWN,
  },
];

export const downloadCSvheaders: string[] = [
  "DEVICE ID",
  "MERCHANT NAME",
  "IDENTIFIER",
  "DEVICE TYPE",
  "STATUS",
  "CREATED ON",
  "ENROLLMENT STATUS",
  "UPDATED ON",
];

export const errors: Error[] = [
  {
    name: "required",
    text: "This field is required",
    rules: ["dirty"],
  },
];
