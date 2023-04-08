import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-terms-of-use-modal",
  templateUrl: "./terms-of-use-modal.component.html",
  styleUrls: ["./terms-of-use-modal.component.scss"],
})
export class TermsOfUseModalComponent {
  checked = false;
  today: Date = new Date();
  @Output() modalClosed = new EventEmitter<{ accepted: boolean }>();

  @ViewChild("termsModal", { static: true }) modalElement: ElementRef;

  constructor() {}

  onSubmit() {
    this.modalClosed.emit({ accepted: true });
  }

}
