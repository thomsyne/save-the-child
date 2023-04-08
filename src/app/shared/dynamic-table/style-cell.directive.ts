import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import { first } from "rxjs/operators";

/*
 * Here we expect to inputs appStyleCell which represents the cell value and the * key which represents the cell's key. We also inject ElementRef and Renderer2
 * so we can update the view. Now that we have the inputs, we can set custom
 * views based on incoming values.
 *
 */

@Directive({
  selector: "[appStyleCell]",
})
export class StyleCellDirective {
  @Input() appStyleCell: any; // Represents the cells value
  @Input() key: string; // Represents the cells key

  statusTextRepresentation = ["status", "isActive", "active"];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.statusTextRepresentation.includes(this.key)) {
      if (this.appStyleCell === "ACTIVE" || this.appStyleCell === true) {
        this.renderer.setStyle(this.el.nativeElement, "color", "#13a500");
        this.el.nativeElement.innerHTML = "Active";
      }
      if (this.appStyleCell === "INACTIVE" || this.appStyleCell === false) {
        this.renderer.setStyle(this.el.nativeElement, "color", "#c9ae1c");
        this.el.nativeElement.innerHTML = "In-active";
      }
    }

    if (this.appStyleCell === null || this.appStyleCell === undefined) {
      // Empty cell formatting
      this.el.nativeElement.innerHTML = "-";
    }

    if (typeof this.appStyleCell === "number") {
      // Number formatting
    }
  }
}
