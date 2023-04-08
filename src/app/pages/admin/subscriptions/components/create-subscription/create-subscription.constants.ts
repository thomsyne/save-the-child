import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const createSubscriptionModalData: ModalMetaData = {
  modalType: "primary",
  header: "Add Subscription",
  subHeader: "Provide details of the subscription you wish to add.",
  buttonText: "Add Subscription",
};

export const createSubscriptionForm: Field[] = [
  {
    name: "name",
    displayValue: "Subscription Name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "fee",
    displayValue: "Fee",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "maxNumberOfOtherDevices",
    displayValue: "Max No. of Devices",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "maxNumberOfStores",
    displayValue: "Max No. of Stores",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "maxNumberOfUsers",
    displayValue: "Max No. of Users",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "maxNumberOfPOSDevices",
    displayValue: "Max No. of POS Devices",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "trialPeriodDays",
    displayValue: "Length of Trial Period (Days)",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "paymentCycle",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map([
      ["Monthly", "Monthly"],
      ["Quarterly", "Quarterly"],
      ["Annually", "Annually"],
    ])
  },
  {
    name: "type",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map([
      ["Outright", "Outright"],
      ["Mobile", "Mobile"],
      ["Lease", "Lease"],
    ])
  },
  {
    name: "active",
    displayValue: "Activate Subscription",
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
