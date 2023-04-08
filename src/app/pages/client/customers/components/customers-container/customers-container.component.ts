import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute } from '@ga/core';

@Component({
  selector: 'app-customers-container',
  templateUrl: './customers-container.component.html',
  styleUrls: ['./customers-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersContainerComponent extends CurrentRoute implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {}
}
