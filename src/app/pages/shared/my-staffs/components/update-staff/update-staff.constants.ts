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
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
];

export const updateStaffFormFields: Field[] = [
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
    validation: [Validators.required],
  },
  {
    name: "merchantCode",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    visible: false
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
    // ])
  },
  {
    name: "currentStore",
    displayValue: "Current Store",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
  },
  {
    name: "active",
    type: FieldType.CHECKBOX
  }
];

export const updateRoleAccessFormFields: Field[] = [];

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
