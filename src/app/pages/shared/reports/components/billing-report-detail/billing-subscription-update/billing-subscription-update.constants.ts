import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { paymentMethods } from "@ga/core";

export const subscriptionUpdateModalData: ModalMetaData = {
  modalType: "primary",
  header: "Manually Correct Invoice",
  subHeader: "Please enter the payment details as requested.",
  buttonText: "Save",
};

export const subscriptionUpdateForm: Field[] = [
  {
    name: "paymentMethod",
    displayValue: "Payment Method",
    type: FieldType.SELECTDROPDOWN,
    options: new Map(paymentMethods),
    validation: [Validators.required],
  },
  {
    name: "retrievalRefNumber",
    displayValue: "RRN",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "paymentDate",
    displayValue: "Payment Date",
    type: FieldType.DATEPICKER,
    validation: [Validators.required],
  }
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
