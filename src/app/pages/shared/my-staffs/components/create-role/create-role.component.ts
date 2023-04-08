import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent, Field, FieldType } from '@ga/dynamic-form';
import { ButtonState } from '@ga/dynamic-table';
import { Subscription } from 'rxjs';
import { Role } from '../..';
import { StaffsService } from '../../services/staff.service';
import { createRoleAccessFormFields, createRoleFormFields, errors } from './create-role.constants';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRoleComponent implements OnInit, AfterViewChecked {

  @ViewChild("roleForm", { static: false }) roleForm: DynamicFormComponent;
  @ViewChild("accessForm", { static: false }) accessForm: DynamicFormComponent;

  createRoleForm = createRoleFormFields;
  createRoleAccessForm: Field[] = [];
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  constructor(
    private staffsService: StaffsService,
    private router: Router,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getRoleCategories();
  }

  ngAfterViewChecked() {
    this.subscriptions.push(
      this.roleForm.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      ),
    );
  }

  getRoleCategories() {
    this.staffsService.fetchRoleCategories().subscribe({
      next: (res) => {
        const roleCategotyOptions: Map<string, string> = new Map();
        res.forEach((category) => {
          roleCategotyOptions.set(category, category);
        })
        this.createRoleForm[1].options = roleCategotyOptions;
        this.getPermissions();
      }
    });
  }

  getPermissions() {
    this.subscriptions.push(
      this.staffsService.fetchPermissions().subscribe(res => {
        res.forEach((permission) => {
          createRoleAccessFormFields.push({
            name: permission,
            displayValue: permission.replace(/_/g, ' '),
            type: FieldType.CHECKBOX,
            defaultValue: false
          });
        });
        this.createRoleAccessForm = createRoleAccessFormFields;
        this.ref.markForCheck();
      })
    )
  }

  createRole() {
    const roleValues = this.roleForm.form.value;
    const accessValues = this.accessForm.form.value;

    let roleFormData = {
      name: '',
      category: '',
      active: false
    };
    let roleAccessArray = [];

    for (const [key, value] of Object.entries(roleValues)) {
      roleFormData[key] = value ?? false;
    }
    for (const [key, value] of Object.entries(accessValues)) {
      if(value) roleAccessArray.push(key);
    }

    const rolePayload: Partial<Role> = {
      ...roleFormData,
      permissions: roleAccessArray
    };

    this.staffsService.addRole(rolePayload).subscribe(res => {
      this.router.navigateByUrl("/staff/permissions");
    })
  }

}
