import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from '@ga/core';

@Component({
  selector: 'app-sales-container',
  templateUrl: './sales-container.component.html',
  styleUrls: ['./sales-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesContainerComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.storageService.isGaAdmin();
  }

}
