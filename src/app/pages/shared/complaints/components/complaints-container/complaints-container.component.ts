import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute, StorageService } from '@ga/core';

@Component({
  selector: 'app-support-container',
  templateUrl: './complaints-container.component.html',
  styleUrls: ['./complaints-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintsContainerComponent extends CurrentRoute implements OnInit {

  isAdmin: boolean;
  constructor(
    router: Router,
    private storageService: StorageService
  ) {
    super(router);
  }

  ngOnInit() {
    this.isAdmin = this.storageService.isGaAdmin();
  }
}
