import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const updateSubscriptionPlanFormData: Field[] = [
  {
    name: "subscriptionPlan",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
  },
  {
    name: "paymentCycle",
    displayValue: "Duration",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map([
      ["Monthly", "Monthly"],
      ["Quarterly", "Quarterly"],
      ["Annually", "Annually"],
    ])
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
