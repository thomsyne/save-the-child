import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRoute } from '@ga/core';

@Component({
  selector: 'app-bank-container',
  templateUrl: './bank-container.component.html',
  styleUrls: ['./bank-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankContainerComponent extends CurrentRoute implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit(): void {
  }

}
