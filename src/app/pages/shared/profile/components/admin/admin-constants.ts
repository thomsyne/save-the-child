import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { ModalMetaData } from "@ga/modal";

export const enterOTPModalData: ModalMetaData = {
  modalType: "primary",
  header: "Enter OTP",
  buttonText: "Validate",
};

export const otpFormFields: Field[] = [
  {
    name: "otp",
    displayValue: "OTP",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
];

export const editProfileForm: Field[] = [
  {
    name: "firstName",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "lastName",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "phoneNumber",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    disabled: true,
  },
  {
    name: "emailAddress",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.email],
    gridStyle: "row-col__md-6",
    disabled: true,
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
