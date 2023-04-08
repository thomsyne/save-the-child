import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const updateShopForm: Field[] = [
  {
    name: "name",
    displayValue: "shopName",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
];

export const errors: Error[] = [
  {
    name: "required",
    text: "This field is required",
    rules: ["dirty"],
  },
];
