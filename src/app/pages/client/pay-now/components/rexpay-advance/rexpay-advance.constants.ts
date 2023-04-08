import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { payCycles } from "src/app/core/constants";

export const payAdvanceFormData: Field[] = [
  {
    name: "paymentCycle",
    displayValue: "Cycle Count",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map(payCycles),
    defaultValue: 1
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
