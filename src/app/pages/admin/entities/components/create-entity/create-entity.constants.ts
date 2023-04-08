import { Validators } from "@angular/forms";
import { countries, currencies, allBanks, settlementTypes } from "@ga/core";
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

export const logoFileUploadMetadata: FileUploadMetadata[] = [
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

export const createEntityForm: Field[] = [
  {
    displayValue: "Entity Name",
    name: "name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    displayValue: "Country",
    name: "countryCode",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    options: new Map(countries),
  },
  {
    displayValue: "Currency",
    name: "currency",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    options: new Map(currencies),
  },
  {
    displayValue: "Provider",
    name: "provider",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    displayValue: "Settlement Bank",
    name: "settlementBankCode",
    type: FieldType.SELECTDROPDOWN,
    // validation: [Validators.required],
    gridStyle: "row-col__md-6",
    options: new Map(banks),
  },
  {
    displayValue: "Settlement Bank Code",
    name: "settlementBankCode",
    type: FieldType.TEXTFIELD,
    // validation: [Validators.required],
    gridStyle: "hidden",
  },
  {
    displayValue: "Settlement Type",
    name: "settlementType",
    type: FieldType.SELECTDROPDOWN,
    gridStyle: "row-col__md-6",
    options: new Map(settlementTypes)
  },
  {
    displayValue: "Settlement Account",
    name: "settlementAccount",
    type: FieldType.NUMBERFIELD,
    // validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "subscriptionAllow",
    type: FieldType.CHECKBOX,
    gridStyle: "row-col__md-3",
  },
  {
    name: "isActive",
    type: FieldType.CHECKBOX,
    gridStyle: "row-col__md-3",
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

export const createEntityErrors: Error[] = [
  {
    name: "required",
    text: "This field is required",
    rules: ["dirty"],
  },
  {
    name: "min",
    text: "Cannot be less than 1",
    rules: ["dirty"],
  },
];
