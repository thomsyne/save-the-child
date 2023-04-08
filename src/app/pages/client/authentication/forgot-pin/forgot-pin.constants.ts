import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const loginClientDetailsForm: Field[] = [
  {
    name: "phoneNumber",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.minLength(11)],
    gridStyle: "row-col",
  },
  {
    name: "merchantCode",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.minLength(7)],
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
    name: "min",
    text: "This field is below the minimum length",
    rules: ["dirty"],
  },
];
