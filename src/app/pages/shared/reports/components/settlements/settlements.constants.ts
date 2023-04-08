import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { ModalMetaData } from "@ga/modal";

export const requestSettlementModalData: ModalMetaData = {
  modalType: "primary",
  header: "Request Settlement",
  buttonText: "Send Request",
};

export const requestSettlementFormFields: Field[] = [
  {
    name: "amount",
    displayValue: "Amount to request for",
    type: FieldType.NUMBERFIELD,
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