import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute } from '@ga/core';

@Component({
  selector: 'app-paynow-container',
  templateUrl: './paynow-container.component.html',
  styleUrls: ['./paynow-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaynowContainerComponent extends CurrentRoute implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {}
}

