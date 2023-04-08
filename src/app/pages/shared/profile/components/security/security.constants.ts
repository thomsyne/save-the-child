import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { allBanks } from "src/app/core/constants/constants";

let banks: Map<string, string> = new Map();

allBanks.forEach((bank) => {
  banks.set(bank.name, bank.Code);
});

export const changePasswordForm: Field[] = [
  {
    name: "currentPin",
    type: FieldType.PASSWORDFIELD,
    validation: [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ],
  },
  {
    name: "newPin",
    type: FieldType.PASSWORDFIELD,
    validation: [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ],
  },
  {
    name: "confirmPin",
    type: FieldType.PASSWORDFIELD,
    validation: [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ],
  },
];

export const errors: Error[] = [
  {
    name: "required",
    text: "This field is required",
    rules: ["dirty"],
  },
  {
    name: "minlength",
    text: "Minimum of 4 characters required",
    rules: ["dirty"],
  },
  {
    name: "maxlength",
    text: "Maximum of 4 characters required",
    rules: ["dirty"],
  },
];
