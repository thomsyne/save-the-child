import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute } from '@ga/core';

@Component({
  selector: 'app-entity-container',
  templateUrl: './entity-container.component.html',
  styleUrls: ['./entity-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityContainerComponent extends CurrentRoute implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {
  }

}
