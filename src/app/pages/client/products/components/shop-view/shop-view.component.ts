import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Shop } from '../../../shops';
import { ShopsService } from '../../../shops/services/shops.service';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopViewComponent implements OnInit, OnDestroy {

  id: number;
  shop$: Observable<Shop>;
  isShop: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopsService: ShopsService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.shop$ = this.shopsService.currentShop;
    this.shop$
      .pipe(takeUntil(this.destroy$))
      .subscribe(shop => {
        shop ? this.isShop = true : this.getShop();
      });
  }


  getShop() {
    this.router.navigateByUrl("products/shops");
    // this.shopsService.fetchSingleShop(this.id).subscribe((res) => {
    //   this.shopsService.changeShop(res);
    //   this.isShop = true;
    // })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
