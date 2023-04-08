import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { SalesReport } from 'src/app/pages/shared/reports/model';
import { ShopsService } from '../../../shops/services/shops.service';
import { transactionModalData } from './transaction-info.constants';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionInfoComponent implements OnInit {
  @Input() transaction: SalesReport;
  @Output() closeModal = new EventEmitter();

  modalData = transactionModalData;
  constructor(
    private shopsService: ShopsService,
  ) { }

  ngOnInit(): void {
  }

  printTransactionDetail(id: number) {
    this.shopsService.printReceipt(id).subscribe(
      (res) => this.downLoadFile(res, "application/pdf"),
    );
  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);

    if (!pwa || pwa.closed || typeof pwa.closed === "undefined") {
      alert("Please disable your Pop-up blocker and try again.");
    }
  }

}
