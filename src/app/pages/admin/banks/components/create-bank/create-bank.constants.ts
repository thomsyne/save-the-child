import { Validators } from "@angular/forms";
import { allBanks, countryCodes, statusTypes } from "@ga/core";
import { Field, FieldType, Error } from "@ga/dynamic-form";
import { FileUploadMetadata } from "@ga/file-upload";

let banks: Map<string, string> = new Map();

allBanks.forEach((bank) => {
    banks.set(bank.name, bank.Code);
});

const fileMetaData: FileUploadMetadata = {
    type: "single",
    supportedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
};

export const logoFileUploadMetadata: FileUploadMetadata[] = [
    {
        label: "Logo",
        name: "logo",
        ...fileMetaData,
    }
];


export const createBankForm: Field[] = [

    {
        displayValue: "Bank Name",
        name: "name",
        type: FieldType.TEXTFIELD,
        validation: [Validators.required],
        gridStyle: "row-col__md-6",
    },
    {
        displayValue: "Bank Code",
        name: "code",
        type: FieldType.TEXTFIELD,
        validation: [Validators.required],
        gridStyle: "row-col__md-6",
    },
    {
        displayValue: "Bank instant Code",
        name: "instantCode",
        type: FieldType.TEXTFIELD,
        validation: [Validators.required],
        gridStyle: "row-col__md-6",
    },
    {
        displayValue: "Bank ACH Code",
        name: "otherCode",
        type: FieldType.TEXTFIELD,
        validation: [Validators.required],
        gridStyle: "row-col__md-6",
    },
    {
        displayValue: "Country",
        name: "countryCode",
        type: FieldType.SELECTDROPDOWN,
        validation: [Validators.required],
        gridStyle: "row-col__md-6",
        options: new Map(countryCodes),
    },
    {
        name: "isActive",
        type: FieldType.CHECKBOX,
        gridStyle: "row-col__md-6",
    },
    {
        displayValue: "Logo",
        name: "logo",
        type: FieldType.TEXTFIELD,
        gridStyle: "hidden",
    }
];


export const createBankErrors: Error[] = [
    {
        name: "required",
        text: "This field is required",
        rules: ["dirty"],
    },
    {
        name: "min",
        text: "Cannot be less than 1",
        rules: ["dirty"],
    },
];
