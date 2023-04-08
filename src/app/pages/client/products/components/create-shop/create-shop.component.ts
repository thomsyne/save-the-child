import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { DynamicFormComponent } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { Shop } from '../../../shops/model';
import { ShopsService } from '../../../shops/services/shops.service';
import { createShopForm, createShopModalData, errors } from './create-shop.constants';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateShopComponent implements OnInit, AfterViewInit {

  @ViewChild(DynamicFormComponent, { static: true })
  form: DynamicFormComponent;

  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  modalData = createShopModalData;
  createUserForm = createShopForm;
  errors = errors;
  buttonDisabled: ButtonState = "INVALID";
  subscriptions: Subscription[] = [];
  constructor(
    private shopsService: ShopsService,
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

  createShop() {
    const { name, description, address } = this.form.form.value;

    const createForm: Partial<Shop> = {
      name,
      description,
      address,
    };

    this.shopsService.createStore(createForm).subscribe(
      (res) => {
        this.closeModal.emit();
        this.refreshData.emit();
      });
  }
}
