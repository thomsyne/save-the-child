import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute } from '@ga/core';

@Component({
  selector: 'app-subscriptions-container',
  templateUrl: './subscriptions-container.component.html',
  styleUrls: ['./subscriptions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsContainerComponent extends CurrentRoute implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {}
}
