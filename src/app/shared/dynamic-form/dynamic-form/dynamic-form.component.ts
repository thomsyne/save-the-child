import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Field, Error, KeyValuePair } from "../model";

@Component({
  selector: "lib-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
})
export class DynamicFormComponent implements OnInit {
  /**
   * Initialize Inputs passed in from parent component
   */
  @Input() fieldset: Field[]; // Required (form structure)
  @Input() errors: Error[]; // Optional
  @Input() prefillData: KeyValuePair[]; // Optional (default values)
  @Input() readOnly = false; // Optional

  /**
   * Initialize empty Reactive Form Group, set marker to false
   * until Form Controls have been added and the form is ready.
   */
  public form: FormGroup;
  public formReady = false;

  /*
   * Use this to get the value of the form
   */
  public formValues: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    /**
     * Confirm a fieldset was passed in
     */
    if (this.fieldset) {
      console.log(this.fieldset);

      /**
       * Initialize Reactive Form
       */
      this.initializeForm();
    } else {
      console.warn("Please pass a fieldset into the dynamic form component.");
    }
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({});

    console.log(this.fieldset);

    /**
     * Iterate through fields for each section
     */
    this.fieldset.forEach((field) => {
      /**
       * Create each form field and add it to the Form Group
       */
      this.form.addControl(field.name, this.initializeFormControl(field));
    });

    /*
     * Assign formValue to the forms valueChanges
     */
    this.form.valueChanges.subscribe((val) => {
      this.formValues = val;
    });

    /**
     * That's it, we're ready to go! Turn on the Template! 🥳
     */

    /*
     * Form ready
     */
    this.formReady = true;
  }

  initializeFormControl(field): FormControl {
    let value;

    /**
     * Populate defaultValues from constants if assigned
     */
    if (typeof field.defaultValue !== "undefined") {
      value = field.defaultValue;
    }

    /**
     * Check each field for a coordinating field in prefillData
     */
    if (this.prefillData) {
      const defaultValue = this.prefillData.filter(
        (element, index) => element.key === field.name
      );
      if (defaultValue.length) {
        value = defaultValue[0].value;
      }
    }

    /**
     * Handle validation (or initialize null), disabled fields, and visibility
     * (passing in readOnly = true will disabled ALL fields)
     */
    const validation = field.validation ? field.validation : [];
    const isDisabled = field.disabled || this.readOnly ? true : false;

    /**
     * That's it, we're done! Return our new Form Control up to the form.
     */
    return this.formBuilder.control(
      { value, disabled: isDisabled },
      validation
    );
  }

  extractFormValues(form): KeyValuePair[] {
    /**
     * Extract Form Field Names and Values into an array of key value pairs
     */
    const formValues = [];
    if (form.controls) {
      Object.keys(form.controls).forEach((key) => {
        if (form.controls[key].controls) {
          formValues.push({
            key,
            value: this.extractFormValues(form.controls[key]),
          });
        } else {
          formValues.push({ key, value: form.get(key).value });
        }
      });
    }
    return formValues;
  }
}
