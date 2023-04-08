import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { LabelledDropdownParameters, DropdownItem } from "../model";

@Component({
  selector: "lib-labelled-dropdown",
  templateUrl: "./labelled-dropdown.component.html",
  styleUrls: ["./labelled-dropdown.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelledDropdownComponent implements OnInit {
  open = false;

  @Input("params") dropdownParameters: LabelledDropdownParameters;
  currentItem: DropdownItem;
  show = false;

  @Output() itemSelected = new EventEmitter<any>();

  constructor() {}

  onItemSelected(item: DropdownItem) {
    if (item.key == this.currentItem.key) {
      this.open = false;
      return;
    } else {
      this.currentItem = item;
      this.itemSelected.emit(this.currentItem.value);
      this.open = false;
    }
  }

  manageDropdown() {
    this.open = !this.open;
  }

  ngOnInit() {
    this.currentItem = this.dropdownParameters.items[0];

    if (this.dropdownParameters.current) {
      const item = this.dropdownParameters.items.find(
        (item) => item.value == this.dropdownParameters.current
      );
      this.currentItem = item;
    }
  }
}
