import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const createShopModalData: ModalMetaData = {
  modalType: "primary",
  header: "Add New Shop",
  subHeader: "Please enter the updated details of the account.",
  buttonText: "Add Shop",
};

export const createShopForm: Field[] = [
  {
    name: "name",
    displayValue: "Shop Name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "address",
    type: FieldType.TEXTFIELD,
  },
  {
    name: "description",
    displayValue: "Shop Description",
    type: FieldType.TEXTFIELD,
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
