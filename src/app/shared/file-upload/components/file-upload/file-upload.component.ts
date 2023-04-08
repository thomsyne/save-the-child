import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { FileUploadMetadata } from "../../model";
import { AlertService } from "@ga/utility";

@Component({
  selector: "lib-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements OnInit {
  @Input() uploadMetadata: FileUploadMetadata;
  @Output() onFileSelected = new EventEmitter<File>();
  @Output() onFileDeleted = new EventEmitter<File>();

  @Input() showFileUrl: boolean = false;
  @Input() fileUrl: string = "";
  @Input() background: 'white' | 'transparent' = 'transparent';

  file: File;

  el: HTMLInputElement;

  showFile = false;
  constructor(private alertService: AlertService) {
    console.log(this.fileUrl);
  }

  createInputElement() {
    this.el = document.createElement("input") as HTMLInputElement;
    this.el.setAttribute("type", "file");

    this.el.addEventListener("change", (evt) => {
      const file = (<HTMLInputElement>evt.target).files[0];
      if (!this.uploadMetadata.supportedFileTypes.includes(file.type)) {
        this.alertService.warn(
          "Looks like you are uploading a file with the wrong format"
        );
        return;
      } else {
        this.file = file;
        this.onFileSelected.emit(this.file);
      }
    });
  }

  selectFile() {
    this.el.click();
  }

  ngOnInit() {
    this.createInputElement();
  }

  deleteFile($event){
    this.file = null
    this.fileUrl = null
    $event.target.value = ""
    this.onFileDeleted.emit()
  }
}
