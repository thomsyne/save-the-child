import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const createStaffModalData: ModalMetaData = {
  modalType: "primary",
  header: "Add New Staff",
  subHeader: "Please enter the updated details of the account.",
  buttonText: "Add Staff",
};

export const createStaffFormFields: Field[] = [
  {
    name: "firstName",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "lastName",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "phoneNumber",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "email",
    displayValue: "Email Address",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.email],
  },
  {
    name: "userRole",
    displayValue: "Staff Role",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    // options: new Map([
    //   ["Administrator", "Administrator"],
    //   ["Cashier", "Cashier"],
    //   ["Finance", "Finance"],
    //   ["Supervisor", "Supervisor"],
    // ]),
  },
  {
    name: "currentStore",
    displayValue: "Store",
    type: FieldType.SELECTDROPDOWN,
    visible: false
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
