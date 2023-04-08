import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { ProductCategory } from '../../model';
import { ProductService } from '../../services/products.service';
import { createProductCategoryForm, createProductCategoryModalData, errors } from './create-product-category.constants';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-product-category.component.html',
  styleUrls: ['./create-product-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProductCategoryComponent implements OnInit, AfterViewInit {

  @ViewChild(DynamicFormComponent, { static: true })
  form: DynamicFormComponent;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = createProductCategoryModalData;
  createUserForm = createProductCategoryForm;
  errors = errors;
  buttonDisabled: ButtonState = "INVALID";
  subscriptions: Subscription[] = [];
  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    // Subscribe to form validation status
    this.subscriptions.push(
      this.form.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  createProductCategory() {
    const { name, description, isActive } =
    this.form.formValues;

    const createForm: Partial<ProductCategory> = {
      name,
      description,
      isActive,
    };

    this.productService.createProductCategory(createForm).subscribe(
      (res) => {
        this.closeModal.emit();
        this.refreshData.emit();
      });
  }
}
