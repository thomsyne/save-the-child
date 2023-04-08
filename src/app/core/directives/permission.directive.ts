import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { map } from "rxjs/operators";
import { StorageService, UserDetails } from "..";

@Directive({
  selector: "[hasPermission]",
})
export class PermissionDirective implements OnInit {
  private currentUser: UserDetails;
  private permissions: string[] = [];
  private logicalOp = "AND";
  private isHidden = true;

  constructor(
    private storageService: StorageService,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.storageService.userData$
      .pipe(map((user) => user.userDetails))
      .subscribe((user) => {
        this.currentUser = user;
        this.updateView();
      });
  }

  @Input()
  set hasPermission(val: string[]) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(permop: string) {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;

    if (this.currentUser && this.currentUser.permissions) {
      // console.log(this.currentUser.permissions);

      for (const checkPermission of this.permissions) {
        const permissionFound = this.currentUser.permissions.find(
          (x) => x.toUpperCase() === checkPermission.toUpperCase()
        );

        if (permissionFound) {
          hasPermission = true;

          if (this.logicalOp === "OR") {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === "AND") {
            break;
          }
        }
      }
    }

    return hasPermission;
  }
}
