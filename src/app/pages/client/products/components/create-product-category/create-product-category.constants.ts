import { ModalMetaData } from "@ga/modal";
import { Validators } from "@angular/forms";
import { Field, FieldType, Error } from "@ga/dynamic-form";

export const createProductCategoryModalData: ModalMetaData = {
  modalType: "primary",
  header: "Add Product Catgory",
  subHeader: "Please enter the updated details of the account.",
  buttonText: "Add Category",
};

export const createProductCategoryForm: Field[] = [
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
  },
  {
    name: "isActive",
    displayValue: "Activate Category",
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
