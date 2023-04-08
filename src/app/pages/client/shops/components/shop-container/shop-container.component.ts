import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute } from '@ga/core';

@Component({
  selector: 'app-shop-container',
  templateUrl: './shop-container.component.html',
  styleUrls: ['./shop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopContainerComponent extends CurrentRoute implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {}
}


