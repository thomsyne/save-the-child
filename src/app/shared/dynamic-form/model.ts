import { Validators } from "@angular/forms";

export enum FieldType {
  CHECKBOX, // 0
  DATEPICKER, // 1
  SELECTDROPDOWN, // 2
  TEXTAREA, // 3
  TEXTFIELD, // 4
  NUMBERFIELD, // 5
  PASSWORDFIELD, // 6
}

export interface Field {
  name: string;
  displayValue?: string;
  type: FieldType;
  gridStyle?: string;
  children?: Field[];
  defaultValue?: any;
  disabled?: boolean;
  options?: Map<string, string>;
  parent?: string;
  validation?: Validators[];
  visible?: boolean;
}

export interface KeyValuePair {
  key: string;
  value: any;
}

export interface Error {
  name: string;
  text: string;
  rules: Validators[];
}
