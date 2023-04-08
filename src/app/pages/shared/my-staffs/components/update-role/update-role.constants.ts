import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";


export const updateRoleFormFields: Field[] = [
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
    // options: new Map([
    //   ["Administrator", "Administrator"],
    //   ["Cashier", "Cashier"],
    //   ["Finance", "Finance"],
    //   ["Supervisor", "Supervisor"],
    // ])
  },
  {
    name: "active",
    type: FieldType.CHECKBOX
  }
];

export const updateRoleAccessFormFields: Field[] = [];

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
