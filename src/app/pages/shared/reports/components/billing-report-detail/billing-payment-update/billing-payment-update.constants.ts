import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { billingPaymentMethods } from "@ga/core";

export const paymentOptionModalData: ModalMetaData = {
  modalType: "primary",
  header: "Select Payment Option",
  subHeader: "Please select the payment option",
  buttonText: "Select",
};

export const paymentOptionForm: Field[] = [
  {
    name: "paymentMethod",
    displayValue: "Payment Method",
    type: FieldType.SELECTDROPDOWN,
    options: new Map(billingPaymentMethods),
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
