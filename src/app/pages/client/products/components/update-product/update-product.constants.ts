import { Field, FieldType, Error } from "@ga/dynamic-form";
import { Validators } from "@angular/forms";

export const updateProductFormData: Field[] = [
  {
    displayValue: "Product Name",
    name: "name",
    type: FieldType.TEXTFIELD,
    validation: [Validators.required],
  },
  {
    displayValue: "SKU (Optional)",
    name: "code",
    type: FieldType.TEXTFIELD,
  },
  {
    displayValue: "Product Category",
    name: "productCategoryId",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
  },
  {
    displayValue: "Price",
    name: "price",
    type: FieldType.NUMBERFIELD,
    validation: [Validators.required],
  },
  {
    displayValue: "Stock Quantity",
    name: "stockQuantity",
    type: FieldType.NUMBERFIELD,
    validation: [Validators.required],
  },
  {
    displayValue: "Low Stock Action",
    name: "lowStockAction",
    type: FieldType.SELECTDROPDOWN,
    validation: [Validators.required],
    options: new Map([
      ["Visible", "Visible"],
      ["Invisible", "Invisible"],
      ["Disable", "Disable"],
    ]),
    gridStyle: "row-col__md-6",
  },
  {
    displayValue: "Minimum Stock Quantitiy",
    name: "minimumStock",
    type: FieldType.NUMBERFIELD,
    // validation: [Validators.required, Validators.min(1)],
    gridStyle: "row-col__md-6",
  },
  {
    displayValue: "Description",
    name: "description",
    type: FieldType.TEXTAREA,
  },
  {
    name: "stockTracking",
    type: FieldType.CHECKBOX,
  },
  {
    name: "canExpire",
    type: FieldType.CHECKBOX,
  },
  {
    name: "isActive",
    type: FieldType.CHECKBOX,
  },

  // Can Expire & Stock tracking checkboxes
];

export const updateProductErrors: Error[] = [
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
