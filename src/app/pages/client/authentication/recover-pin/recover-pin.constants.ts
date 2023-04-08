import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const recoverPinFormDetails: Field[] = [
  {
    name: "token",
    displayValue: "OTP",
    type: FieldType.NUMBERFIELD,
    validation: [Validators.required],
    gridStyle: "row-col",
  },
  {
    name: "newPin",
    type: FieldType.PASSWORDFIELD,
    validation: [Validators.required],
    gridStyle: "row-col",
  },
  {
    name: "confirmPin",
    type: FieldType.PASSWORDFIELD,
    validation: [Validators.required],
    gridStyle: "row-col",
  },
];

export const errors: Error[] = [
  {
    name: "required",
    text: "This field is required",
    rules: ["dirty"],
  }
];
