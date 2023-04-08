import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseTableComponent } from '@ga/core';
import { PaginationService } from '@ga/dynamic-table';
import { InventoryService } from '../../services/inventory.service';
import { inventoryTableSettings, filters, downloadCSvheaders } from './inventory.constants';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent extends BaseTableComponent implements OnInit {

  constructor(
    paginationService: PaginationService,
    private invetoryService: InventoryService
  ) {
    super(paginationService);
    this.tableSettings = inventoryTableSettings;
    this.filters = filters;
    this.downloadCSvheaders = downloadCSvheaders;
    this.buttonSettings = [

    ];
  }

  ngOnInit(): void {
  }

  setFilters(filters) {
    this.filterValues = filters;
    this.paginationValues.pageIndex = 0;
    this.paginationValues.currentPage = 1;
    this.getInventories();
  }

  setPager(paginationValues) {
    this.paginationValues = paginationValues;
    this.getInventories();
  }


  getInventories() {
    this.invetoryService.getInventories(
      this.paginationValues.pageIndex,
      this.paginationValues.pageSize,
    ).subscribe({
      next: (res) => console.log(res)
    })
  }

}
