import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute } from '@ga/core';

@Component({
  selector: 'app-devices-container',
  templateUrl: './devices-container.component.html',
  styleUrls: ['./devices-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesContainerComponent extends CurrentRoute implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {}
}

