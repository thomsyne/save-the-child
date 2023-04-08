import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ViewChild, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { ProductCategory } from '../../model';
import { ProductService } from '../../services/products.service';

import { updateCategoryModalData, updateCategoryFormData, errors } from './update-product-category.constants';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProductCategoryComponent implements OnInit, AfterViewInit {

  @Input() categoryToUpdate: ProductCategory;

  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = updateCategoryModalData;
  updateCategoryForm;
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  constructor(
    private productService: ProductService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.fillCategoryUpdateForm();
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.form.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
    this.fillCategoryUpdateForm();
  }

  fillCategoryUpdateForm() {
    updateCategoryFormData[0].defaultValue = this.categoryToUpdate.name;
    updateCategoryFormData[1].defaultValue = this.categoryToUpdate.description;
    updateCategoryFormData[2].defaultValue = this.categoryToUpdate.isActive;
    this.updateCategoryForm = updateCategoryFormData;
    this.ref.markForCheck();
  }

  updateProductCategory() {
    const { name, description, isActive } =
    this.form.formValues;

    const createForm: Partial<ProductCategory> = {
      name,
      description,
      isActive,
      id: this.categoryToUpdate.id,
    };

    this.productService.updateProductCategory(this.categoryToUpdate.id, createForm).subscribe(
      (res) => {
        this.closeModal.emit();
        this.refreshData.emit();
      });
  }

}
