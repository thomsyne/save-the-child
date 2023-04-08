
import { Observable } from 'rxjs';
import { Stock } from './../../model';
import { InventoryService } from './../../services/inventory.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileGenerationService } from '@ga/dynamic-table';
import { downloadCSvheaders } from './stocks.constants';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksComponent implements OnInit {
  id: number;
  subscription: Subscription;
  stockHistory: Stock[];
  productName: string = 'My Complete';
  downloadCSvheaders = downloadCSvheaders;

  constructor(
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private fileService: FileGenerationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];

    this.getStocks();
  }

  getStocks(){
    this.subscription = this.inventoryService.getInventoryStock(this.id).subscribe(
      (response: Stock[]) => {
       this.ref.detectChanges()
        this.stockHistory = response;
        this.productName = response[0]?.product
        this.ref.detectChanges()
      }
    )
  }

  generateCsv() {
    // Get count from count$
    let count: number;

    let newData = []

    this.stockHistory.forEach((el) => {
      const {
        store,
        quantity,
        minimumStock,
        expiryDate,
        lowStock,
      } = el;

      const dump = {
        store,
        quantity,
        minimumStock,
        expiryDate,
        lowStock,
      };

      newData.push(dump);
    });

    this.fileService.generateCSV(
      newData,
      "Stock Update History for " + this.productName,
      this.downloadCSvheaders
    );
  }

}
