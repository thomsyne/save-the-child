import { Validators } from "@angular/forms";
import { allBanks } from "@ga/core";
import { Field, FieldType, Error } from "@ga/dynamic-form";

let banks: Map<string, string> = new Map();

allBanks.forEach((bank) => {
  banks.set(bank.name, bank.Code);
});

export const accountInformationForm: Field[] = [
  {
    name: "accountNumber",
    type: FieldType.NUMBERFIELD,
    validation: [Validators.required, Validators.minLength(10)],
    gridStyle: "row-col__md-6",
  },
  {
    name: "bankName",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "accountName",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    disabled: true,
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
    text: "This field requires 10 digits",
    rules: ["dirty"],
  },
];
