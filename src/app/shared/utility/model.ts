export interface LabelledDropdownParameters {
  label: string;
  items: DropdownItem[];
  current?: any;
}

export interface DropdownItem {
  key: string;
  value: any;
}
