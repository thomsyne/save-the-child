import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const createDeviceModalData: ModalMetaData = {
  modalType: "primary",
  header: "New Device",
  subHeader: "Provide details of the device you wish to add.",
  buttonText: "Add Device",
};

export const createDeviceForm: Field[] = [
  {
    name: "identifier",
    displayValue: "Device ID",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "merchant",
    displayValue: "Assign to merchant (Optional)",
    type: FieldType.SELECTDROPDOWN,
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
