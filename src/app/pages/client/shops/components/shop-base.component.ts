import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Shop } from '../model';
import { ShopsService } from '../services/shops.service';

@Component({
  selector: 'app-reoprts-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopBase implements OnInit {

  id: number;
  shop$: Observable<Shop>;
  isShop: boolean;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public shopsService: ShopsService,
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.id = params["id"];
    this.shop$ = this.shopsService.currentShop;
    this.shop$.pipe(take(1)).subscribe(shop => {
      shop ? this.isShop = true : this.router.navigate([`shops`]);
    });
  }

}