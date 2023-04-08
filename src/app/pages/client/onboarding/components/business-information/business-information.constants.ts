import { Validators } from "@angular/forms";
import { StorageService } from "@ga/core";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { FileUploadMetadata } from "@ga/file-upload";
import { allBanks, currencyCodes, dialCodes, ghanaIDTypes } from "src/app/core/constants/constants";

let banks: Map<string, string> = new Map();
const entityDetails = StorageService.prototype.getCurrentEntity();

allBanks.forEach((bank) => {
  banks.set(bank.name, bank.Code);
});

const fileMetaData: FileUploadMetadata = {
  type: "single",
  supportedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
};

export const logoFileUploadMetadata: FileUploadMetadata[] = [
  {
    label: "Photo Upload",
    name: "photoLink",
    ...fileMetaData,
  },
  {
    label: "ID Upload",
    name: "identityLink",
    ...fileMetaData,
  },
  {
    label: "Utility Bill Upload",
    name: "utilityLink",
    ...fileMetaData,
  },
  {
    label: "Business Registration Upload",
    name: "businessRegLink",
    ...fileMetaData,
  },
  {
    label: "Resident Permit Upload",
    name: "residentPermitLink",
    ...fileMetaData,
  }
];

export const identityTypeForm: Field[] = [
  {
    name: "identityType",
    type: FieldType.SELECTDROPDOWN,
    validation: [],
    options: new Map(ghanaIDTypes),
    gridStyle: "row-col__md-6",
  },
]

export const businessDetailsForm: Field[] = [
  {
    name: "businessName",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "businessAddress",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
  },
  {
    name: "contactEmail",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.email],
    gridStyle: "row-col__md-6",
  },
  {
    name: "cacNumber",
    type: FieldType.TEXTFIELD,
    gridStyle: "row-col__md-6",
  },
  {
    name: "taxIdentificationNumber",
    type: FieldType.NUMBERFIELD,
    gridStyle: "row-col__md-6",
  },
  {
    name: "natureOfBusiness",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map([
      ["Supermarket", "Supermarket"],
      ["Electronics", "Electronics"],
      ["Restaurants", "Restaurants"],
      ["Fashion", "Fashion"],
      ["Others", "Others"],
    ]),
    gridStyle: "row-col__md-6",
    defaultValue: undefined,
  },
  {
    name: "dialCode",
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
    name: "currency",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map(currencyCodes),
    gridStyle: "row-col__md-6",
  },
  /**
   * Ghana Details below
   * **/
  {
    displayValue: "Photo Upload",
    name: "photoLink",
    type: FieldType.TEXTFIELD,
    gridStyle: "hidden",
  },
  {
    displayValue: "ID Upload",
    name: "identityLink",
    type: FieldType.TEXTFIELD,
    gridStyle: "hidden",
  },
  {
    displayValue: "Utility Bill Upload",
    name: "utilityLink",
    type: FieldType.TEXTFIELD,
    gridStyle: "hidden",
  },
  {
    displayValue: "Business Registration Upload",
    name: "businessRegLink",
    type: FieldType.TEXTFIELD,
    gridStyle: "hidden",
  },
  {
    displayValue: "Resident Permit Upload",
    name: "residentPermitLink",
    type: FieldType.TEXTFIELD,
    gridStyle: "hidden",
  }
];
export const accountInformationForm: Field[] = [
  {
    name: "accountNumber",
    type: FieldType.NUMBERFIELD,
    validation: [Validators.required, Validators.minLength(10)],
    gridStyle: "row-col__md-6",
  },
  {
    name: "bankName",
    type: FieldType.SELECTDROPDOWN,
    validation: [],
    gridStyle: "row-col__md-6",
  },
  {
    name: "accountName",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
    gridStyle: "row-col__md-6",
    // disabled: entityDetails?.countryCode?.includes('233') ? false : true,
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
    text: "This field requires 10 digits",
    rules: ["dirty"],
  },
  {
    name: "minlength",
    text: "This field requires 10 digits",
    rules: ["dirty"],
  },
];
