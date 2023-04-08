import { Validators } from '@angular/forms';
import { Field, FieldType } from '@ga/dynamic-form';

export const commentFormFields: Field[] = [
  {
    name: 'comment',
    type: FieldType.TEXTAREA,
    validation: [Validators.required],
    displayValue: 'Type Here...',
  },
];

export const rejectFormFileds: Field[] = [
  {
    name: 'description',
    type: FieldType.TEXTAREA,
    validation: [Validators.required],
    // displayValue: 'Type Here...',
  },
];

export const resolveFormFileds: Field[] = [
  {
    name: 'description',
    type: FieldType.TEXTAREA,
    validation: [Validators.required],
    // displayValue: 'Type Here...',
  },
];
