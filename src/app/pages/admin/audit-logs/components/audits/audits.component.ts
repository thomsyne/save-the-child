import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuditsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
