import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute } from '@ga/core';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsContainerComponent extends CurrentRoute implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {}
}
