import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "lib-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() modalType: string; // primary, right-side, confirmation
  @Input() header: string;
  @Input() subHeader: string;
  @Input() buttonText: string; // Optional
  @Input() isDisabled: string;
  @Input() hideCancelButton: string; //optional

  @Output() cancel = new EventEmitter<any>();
  @Output() submit = new EventEmitter();
  @Output() back = new EventEmitter();

  constructor() {}
}
