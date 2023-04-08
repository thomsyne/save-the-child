import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-first-action',
  templateUrl: './first-action.component.html',
  styleUrls: ['./first-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstActionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
