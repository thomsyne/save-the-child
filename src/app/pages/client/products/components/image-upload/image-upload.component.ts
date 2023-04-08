import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ProductService } from "../../services/products.service";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  @Input() existingFileUrls: string[];
  @Output() uploadComplete = new EventEmitter();

  filesToBeUploaded: File[] = [];
  imageUrls: any[] = [];
  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private ref: ChangeDetectorRef
  ) {}

  prepareFiles(e) {
    /*
     * TODO: Validations
     * File size, file types, upload size
     */

    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();

      reader.onload = () => {
        e.target.files[i].src = reader.result;

        const img = new Image();
        img.src = <string>reader.result;

        img.onload = () => {
          e.target.files[i].height = img.height;
          e.target.files[i].width = img.width;
        };
      };
      reader.readAsDataURL(e.target.files[i]);
      this.imageUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(e.target.files[i])
      ));
      this.filesToBeUploaded.push(e.target.files[i]);
    }
    // console.log(this.filesToBeUploaded);
  }

  // Remove a file from the array
  rmvFile(value, bool) {
    bool
      ? (this.existingFileUrls = this.existingFileUrls.filter(
          (el) => el !== value
        ))
      : (this.filesToBeUploaded = this.filesToBeUploaded.filter(
          (el) => el.name !== value
        ));
  }

  uploadFiles() {
    let formData = new FormData();

    // If there are existing urls convert them to piped strings
    // let exUrlStrings = "";
    // if (this.existingFileUrls.length) {
    //   this.existingFileUrls.forEach((el, i) => {
    //     if (i) {
    //       exUrlStrings = exUrlStrings + "||" + el;
    //     } else {
    //       exUrlStrings = exUrlStrings + el;
    //     }
    //   });
    // }

    // If new files were added
    if (this.filesToBeUploaded.length) {
      this.filesToBeUploaded.forEach((el) => {
        formData.append("formFiles", el);
      });

      this.productService.multipleImageService(formData).subscribe((res) => {
        console.log(res);

        // Get an arr of urls
        // let urlString = "";
        const urlArrays: string[] = [];
        res.forEach((el, i) => {
          urlArrays.push(el.url);
          // if (i) {
          //   urlString = `${urlString}||${el.url}`;
          // } else {
          //   urlString = urlString + el.url;
          // }
        });

        // If there are existing urls, join them with the new ones
        if (this.existingFileUrls.length) {
          // urlString = `${exUrlStrings}||${urlString}`;
          urlArrays.push(...this.existingFileUrls)
        }

        this.uploadComplete.emit(urlArrays);
      });
    } else {
      this.uploadComplete.emit(this.existingFileUrls);
    }
  }
}
