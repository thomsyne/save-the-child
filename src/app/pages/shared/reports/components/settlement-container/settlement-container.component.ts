import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-settlement-container',
  templateUrl: './settlement-container.component.html',
  styleUrls: ['./settlement-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettlementContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
