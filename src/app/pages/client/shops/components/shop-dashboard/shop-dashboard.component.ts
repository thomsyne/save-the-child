import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Shop } from '../../model';
import { ShopsService } from '../../services/shops.service';
import { ShopBase } from '../shop-base.component';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  styleUrls: ['./shop-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopDashboardComponent extends ShopBase implements OnInit {

  constructor(
    route: ActivatedRoute,
    router: Router,
    shopsService: ShopsService,
  ) {
    super(route, router, shopsService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
