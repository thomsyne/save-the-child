import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { allBanks } from "src/app/core/constants/constants";

let banks: Map<string, string> = new Map();

allBanks.forEach((bank) => {
  banks.set(bank.name, bank.Code);
});

export const changeMerchantStatusModalData: ModalMetaData = {
  modalType: "confirmation",
  header: "",
  buttonText: "",
};

/* 
  Make sure to update getMerchantDetails() method
  if order of the form changes
*/

export const updateMerchantForm: Field[] = [
  {
    name: "name",
    displayValue: "Merchant Name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "address",
    displayValue: "Residential Address",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  //
  {
    name: "contactEmail",
    displayValue: "Email Address",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "cacNumber",
    displayValue: "CAC Number",
    type: FieldType.TEXTFIELD,
    // disabled: true,
    // validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  //
  {
    name: "contactPhoneNumber",
    displayValue: "Phone Number",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "natureOfBusiness",
    type: FieldType.TEXTFIELD,
    // disabled: true,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  //
  {
    name: "bankCode",
    displayValue: "Bank",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    gridStyle: "row-col__md-2",
    options: new Map(banks),
  },
  {
    name: "accountName",
    type: FieldType.TEXTFIELD,
    disabled: true,
    validation: [Validators.required],
    gridStyle: "row-col__md-4",
  },
  {
    name: "taxIdentificationNumber",
    type: FieldType.TEXTFIELD,
    // disabled: true,
    // validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "currency",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    gridStyle: "row-col__md-2",
    options: new Map([["NGN", "NGN"]]),
  },
  {
    name: "accountNumber",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-4",
  },
  {
    name: "bankVerificationNumber",
    displayValue: "BVN",
    type: FieldType.TEXTFIELD,
    // disabled: true,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "subscriptionStatus",
    type: FieldType.SELECTDROPDOWN,
    options: new Map([
      ["Active", "Active"],
      ["Trial", "Trial"],
      ["PastDue", "PastDue"],
      ["Cancelled", "Cancelled"],
      ["PendingValidation", "PendingValidation"],
    ]),
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "active",
    type: FieldType.CHECKBOX,
    gridStyle: "row-col__md-3",
  },
  {
    name: "startDate",
    type: FieldType.DATEPICKER,
    gridStyle: "row-col__md-6",
  },
  {
    name: "nextPaymentDate",
    type: FieldType.DATEPICKER,
    gridStyle: "row-col__md-6",
  },
  {
    name: "lastPaymentDate",
    type: FieldType.DATEPICKER,
    gridStyle: "row-col__md-6",
  },
  {
    name: "cycleLength",
    type: FieldType.TEXTFIELD,
    gridStyle: "row-col__md-6",
  },
  {
    name: "totalCycles",
    type: FieldType.TEXTFIELD,
    gridStyle: "row-col__md-6",
  },
];

export const updateMerchantSubForm: Field[] = [
  {
    name: "subscriptionPlan",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
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
