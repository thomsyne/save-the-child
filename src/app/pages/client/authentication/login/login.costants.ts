import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const loginClientDetailsForm: Field[] = [
  {
    name: "email",
    displayValue: "Email Address",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.email],
    gridStyle: "row-col",
  },
  {
    name: "password",
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
  },
  {
    name: "email",
    text: "Invalid Email",
    rules: ["dirty"],
  },
];
