import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UtilityModule } from "@ga/utility";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, UtilityModule],
  exports: [ModalComponent],
})
export class ModalModule {}
