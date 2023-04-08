import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute } from '@ga/core';

@Component({
  selector: 'app-reoprts-container',
  templateUrl: './reoprts-container.component.html',
  styleUrls: ['./reoprts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsContainerComponent extends CurrentRoute implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {}
}