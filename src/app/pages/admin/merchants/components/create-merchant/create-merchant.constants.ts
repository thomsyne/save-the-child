import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const createMerchantModalData: ModalMetaData = {
  modalType: "primary",
  header: "Add Merchant",
  subHeader: "Please provide details of the merchant you wish to onboard.",
  buttonText: "Add Merchant",
};

export const createMerchantFormFields: Field[] = [
  {
    name: "name",
    displayValue: "Merchant Name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "contactPhoneNumber",
    displayValue: "Phone Number",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "contactEmail",
    displayValue: "Email Address",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.email],
  },
  {
    name: "subscriptionPlan",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
  },
  {
    name: "currency",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map([["NGN", "NGN"]]),
  },
  {
    name: "isBankMerchant",
    displayValue: "Bank Merchant",
    type: FieldType.CHECKBOX,
  },
  {
    name: "active",
    type: FieldType.CHECKBOX,
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
