import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";


export const createRoleFormFields: Field[] = [
  {
    name: "name",
    displayValue: "Role Name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "category",
    displayValue: "Staff Role",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
  },
  {
    name: "active",
    type: FieldType.CHECKBOX
  }
];

export const createRoleAccessFormFields: Field[] = [];

export const errors: Error[] = [
  {
    name: "required",
    text: "This field is required",
    rules: ["dirty"],
  },
];
