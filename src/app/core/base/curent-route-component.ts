import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reoprts-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentRoute implements OnDestroy {

  currentUrl: string;
  sub: Subscription;

  constructor(
    private router: Router
  ) {
    this.sub = this.router.events.subscribe((_vnts) => {
      if (_vnts instanceof NavigationEnd) {
        const urls = _vnts.url.split("/");
        this.currentUrl = urls[urls.length - 1];
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
