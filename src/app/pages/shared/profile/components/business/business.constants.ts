import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { ModalMetaData } from "@ga/modal";
import { allBanks } from "src/app/core/constants/constants";

let banks: Map<string, string> = new Map();

allBanks.forEach((bank) => {
  banks.set(bank.name, bank.Code);
});

export const enterOTPModalData: ModalMetaData = {
  modalType: "primary",
  header: "Enter OTP",
  buttonText: "Validate",
};

export const otpFormFields: Field[] = [
  {
    name: "otp",
    displayValue: "OTP",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
];

/* 
  If order of the array is changed, make sure to also
  update the getMerchantDetails() method in the component.ts file
*/

export const editBusinessForm: Field[] = [
  {
    name: "name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    disabled: true,
  },
  {
    name: "phoneNumber",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    disabled: true,
  },
  {
    name: "emailAddress",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.email],
    gridStyle: "row-col__md-6",
    disabled: true,
  },
  {
    name: "businessAddress",
    type: FieldType.TEXTFIELD,
    validation: [],
    gridStyle: "row-col__md-6",
    disabled: true,
  },
  {
    name: "cacNumber",
    displayValue: "CAC Number",
    type: FieldType.TEXTFIELD,
    validation: [],
    gridStyle: "row-col__md-6",
    disabled: true,
  },
  {
    name: "bankVerificationNumber",
    displayValue: "BVN",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    disabled: true,
  },
  // {
  //   name: "accountName",
  //   type: FieldType.TEXTFIELD,
  //   validation: [Validators.required],
  //   gridStyle: "row-col__md-6",
  //   disabled: true,
  // },
  // {
  //   name: "accountNumber",
  //   type: FieldType.TEXTFIELD,
  //   validation: [Validators.required],
  //   gridStyle: "row-col__md-6",
  // },
  // {
  //   name: "bankName",
  //   type: FieldType.SELECTDROPDOWN,
  //   validation: [Validators.required],
  //   options: new Map(banks),
  //   gridStyle: "row-col__md-6",
  // },
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
