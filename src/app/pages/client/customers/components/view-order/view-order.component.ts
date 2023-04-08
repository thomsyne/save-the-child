import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from "@angular/core";
import { FileGenerationService } from "@ga/dynamic-table";
import { CustomerOrder } from "../../model";
import { downloadCSvheaders, viewOrderModalData } from "./view-order.constants";

@Component({
  selector: "app-view-order",
  templateUrl: "./view-order.component.html",
  styleUrls: ["./view-order.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOrderComponent {
  @Input() orderDetail: CustomerOrder;
  @Output() closeModal = new EventEmitter();
  modalData = viewOrderModalData;
  downloadCSvheaders = downloadCSvheaders;

  constructor(private fileService: FileGenerationService) {}

  download() {
    let csvData = [];

    this.orderDetail.items.forEach((el) => {
      const { quantity, productName, unitPrice } = el;

      const dump = {
        quantity,
        productName,
        price: quantity * unitPrice,
      };

      csvData.push(dump);
    });

    this.fileService.generateCSV(csvData, "Order", this.downloadCSvheaders);
  }
}
