import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-powered-by',
  templateUrl: './powered-by.component.html',
  styleUrls: ['./powered-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoweredByComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
