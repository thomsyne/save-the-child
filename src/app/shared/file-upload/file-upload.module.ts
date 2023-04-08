import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { CommonModule } from "@angular/common";
import { UtilityModule } from "../utility/utility.module";

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, UtilityModule],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
