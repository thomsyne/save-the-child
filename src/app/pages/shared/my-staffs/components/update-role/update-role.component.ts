import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
  OnDestroy,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicFormComponent, Field, FieldType } from "@ga/dynamic-form";
import { ButtonState } from "@ga/dynamic-table";
import { Subscription } from "rxjs";
import { Role } from "../..";
import { StaffsService } from "../../services/staff.service";
import {
  updateRoleAccessFormFields,
  updateRoleFormFields,
  errors,
} from "./update-role.constants";

@Component({
  selector: "app-update-role",
  templateUrl: "./update-role.component.html",
  styleUrls: ["./update-role.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateRoleComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  name: string;
  role: Role;
  @ViewChild("roleForm", { static: false }) roleForm: DynamicFormComponent;
  @ViewChild("accessForm", { static: false }) accessForm: DynamicFormComponent;

  updateRoleForm = updateRoleFormFields;
  updateRoleAccessForm: Field[] = [];
  errors = errors;
  buttonDisabled: ButtonState;
  subscriptions: Subscription[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private staffsService: StaffsService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.params["name"];
    this.getRoleCategories();
  }

  getRoleCategories() {
    this.staffsService.fetchRoleCategories().subscribe({
      next: (res) => {
        const roleCategotyOptions: Map<string, string> = new Map();
        res.forEach((category) => {
          roleCategotyOptions.set(category, category);
        });
        this.updateRoleForm[1].options = roleCategotyOptions;
        this.getPermissions();
      },
    });
  }

  getPermissions() {
    this.subscriptions.push(
      this.staffsService.fetchPermissions().subscribe((res) => {
        this.getRoleData(this.name, res);
      })
    );
  }

  getRoleData(roleName: string, permissions: string[]) {
    this.subscriptions.push(
      this.staffsService.fetchSingleRole(roleName).subscribe((res) => {
        this.role = res;
        this.roleForm.form.patchValue({
          name: this.role.name,
          category: this.role.category,
          active: this.role.active,
        });
        permissions.forEach((permission) => {
          this.updateRoleAccessForm.push({
            name: permission,
            displayValue: permission.replace(/_/g, " "),
            type: FieldType.CHECKBOX,
            defaultValue: this.role.permissions.includes(permission),
          });
        });
        this.ref.markForCheck();
      })
    );
  }

  ngAfterViewChecked() {
    this.subscriptions.push(
      this.roleForm.form.statusChanges.subscribe(
        (status: ButtonState) => (this.buttonDisabled = status)
      )
    );
  }

  updateRole() {
    const roleValues = this.roleForm.form.value;
    const accessValues = this.accessForm.form.value;

    let roleFormData = {
      name: "",
      category: "",
      active: false,
    };
    let roleAccessArray = [];

    for (const [key, value] of Object.entries(roleValues)) {
      roleFormData[key] = value ?? false;
    }
    for (const [key, value] of Object.entries(accessValues)) {
      if (value) roleAccessArray.push(key);
    }

    const rolePayload: Partial<Role> = {
      ...roleFormData,
      permissions: roleAccessArray,
    };
    this.staffsService.updateRole(rolePayload).subscribe((res) => {
      this.router.navigateByUrl("/staff/permissions");
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
