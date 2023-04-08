import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    router: Router
  ) {
    router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((routerEvent) => routerEvent instanceof NavigationEnd)
      )
      .subscribe((route) => {
        const url: string = route['url'];
        if (url.includes('#')) {
          window.scrollTo(window.scrollX, window.scrollY - 100);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
