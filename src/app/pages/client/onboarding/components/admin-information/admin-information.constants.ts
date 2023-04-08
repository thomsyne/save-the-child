import { StorageService } from './../../../../../core/services/storage.service';
import { Validators } from "@angular/forms";
import { dialCodes } from "@ga/core";
import { Field, FieldType, Error } from "@ga/dynamic-form";

const entityDetails = StorageService.prototype.getCurrentEntity();

export const adminInformationDetails: Field[] = [
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
    name: "countryCode",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map(dialCodes),
    gridStyle: "row-col__md-6",
  },
  {
    name: "phoneNumber",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "emailAddress",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.email],
    gridStyle: "row-col__md-6",
  },
  {
    name: "bvn",
    type: FieldType.TEXTFIELD,
    validation: entityDetails?.countryCode?.includes('234') ? [Validators.required, Validators.minLength(11)] : [],
    gridStyle: "row-col__md-6",
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
  {
    name: "maxlength",
    text: "This field requires 11 digits",
    rules: ["dirty"],
  },
  {
    name: "minlength",
    text: "This field requires 11 digits",
    rules: ["dirty"],
  },
];
