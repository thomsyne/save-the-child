import { ModalMetaData } from "@ga/modal";
;import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const updateCategoryModalData: ModalMetaData = {
  modalType: "primary",
  header: "Update Category",
  buttonText: "Save Changes",
};

export const updateCategoryFormData: Field[] = [
  {
    name: "name",
    displayValue: "Category Name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    name: "description",
    displayValue: "Category Description",
    type: FieldType.TEXTFIELD,
    validation: [],
  },
  {
    name: "isActive",
    displayValue: "Activate Category",
    type: FieldType.CHECKBOX,
    validation: [],
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
