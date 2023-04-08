import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SanitizeOperationTypePipe } from "./sanitize-operation-type.pipe";
import { DescribeResponsePipe } from "./describe-response.pipe";
import { LoaderComponent } from "./loader/loader.component";
import { LabelledDropdownComponent } from "./labelled-dropdown/labelled-dropdown.component";
import { CapitalizePipe } from "./capitalize.pipe";
import { FormatNumberPipe } from "./format-number.pipe";
import { PermissionDirective } from "src/app/core/directives/permission.directive";
import { InitialsPipe } from "src/app/core/pipes/initials.pipe";
import { CustomCurrencyPipe } from './custom-currency.pipe';

@NgModule({
  declarations: [
    SanitizeOperationTypePipe,
    DescribeResponsePipe,
    LoaderComponent,
    LabelledDropdownComponent,
    CapitalizePipe,
    FormatNumberPipe,
    PermissionDirective,
    InitialsPipe,
      CustomCurrencyPipe
   ],
  imports: [CommonModule],
  exports: [
    SanitizeOperationTypePipe,
    DescribeResponsePipe,
    LoaderComponent,
    LabelledDropdownComponent,
    CapitalizePipe,
    FormatNumberPipe,
    PermissionDirective,
    InitialsPipe,
    CustomCurrencyPipe
  ],
})
export class UtilityModule {}
