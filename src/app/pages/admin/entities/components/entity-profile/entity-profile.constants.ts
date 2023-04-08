import { Validators } from "@angular/forms";
import { allBanks, countries, currencies, settlementTypes } from "@ga/core";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { FileUploadMetadata } from "@ga/file-upload";

let banks: Map<string, string> = new Map();

allBanks.forEach((bank) => {
  banks.set(bank.name, bank.Code);
});

const fileMetaData: FileUploadMetadata = {
  type: "single",
  supportedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
};

export const updateEntityForm: Field[] = [
  {
    name: "name",
    displayValue: "Entity Name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    disabled: true
  },
  {
    name: "baseWebUrl",
    displayValue: "Base Web Url",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "countryCode",
    displayValue: "Country",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    options: new Map(countries),
  },
  {
    name: "currency",
    displayValue: "Currency",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    options: new Map(currencies),
  },
  {
    name: "settlementBankCode",
    displayValue: "Settlement Bank",
    type: FieldType.SELECTDROPDOWN,
    // validation: [Validators.required],
    gridStyle: "row-col__md-6",
    options: new Map(banks),
  },
  {
    name: "settlementAccount",
    displayValue: "Settlement Account",
    type: FieldType.TEXTFIELD,
    // validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "provider",
    displayValue: "Provider",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "settlementType",
    displayValue: "Settlement Type",
    type: FieldType.SELECTDROPDOWN,
    gridStyle: "row-col__md-6",
    options: new Map(settlementTypes)
  },
  {
    name: "subscriptionAllow",
    type: FieldType.CHECKBOX,
    gridStyle: "row-col__md-6",
  },
  {
    name: "isActive",
    type: FieldType.CHECKBOX,
    gridStyle: "row-col__md-6",
  },
  {
    name: "hasDefaultedGAPayment",
    type: FieldType.CHECKBOX,
    gridStyle: "row-col__md-3",
  },
  {
    displayValue: "Logo",
    name: "logo",
    type: FieldType.TEXTFIELD,
    gridStyle: "hidden",
  },
  {
    displayValue: "Receipt",
    name: "receiptLogo",
    type: FieldType.TEXTFIELD,
    gridStyle: "hidden",
  },
];

export const errors: Error[] = [
  {
    name: "required",
    text: "This field is required",
    rules: ["dirty"],
  },
  {
    name: "email",
    text: "Invalid Email",
    rules: ["dirty"],
  },
];

export const merchantFileUploadMetadata: FileUploadMetadata[] = [
  {
    label: "Logo",
    name: "logo",
    ...fileMetaData,
  },
  {
    label: "Receipt Logo",
    name: "receiptLogo",
    ...fileMetaData,
  },
];
