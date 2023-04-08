import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const createComplaintModalData: ModalMetaData = {
  modalType: "primary",
  header: "Raise support",
  subHeader: "Have an issue? Feel free to tell us about it.",
  buttonText: "Raise Complaint",
};

export const createComplaintForm: Field[] = [
  {
    name: "reference",
    displayValue: "Dispute Reference",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "category",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map([
      ["Billing", "Billing"],
      ["Order", "Order"],
      ["Settlement", "Settlement"],
    ]),
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
