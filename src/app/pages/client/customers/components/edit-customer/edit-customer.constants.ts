import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const editCustomerModalData: ModalMetaData = {
  modalType: "primary",
  header: "Edit Customer",
  subHeader: "Please enter the customer details to edit.",
  buttonText: "Edit Customer",
};

export const editCustomerForm: Field[] = [
  {
    name: "firstName",
    displayValue: "First Name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "lastName",
    displayValue: "Last Name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "mobileNumber",
    displayValue: "Phone Number",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "email",
    displayValue: "Email Address",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.email],
  },{
    name: "receiveEReceipt",
    displayValue: "Receive E-Receipt",
    type: FieldType.CHECKBOX,
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
