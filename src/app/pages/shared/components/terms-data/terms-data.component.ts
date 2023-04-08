import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-terms-data',
  templateUrl: './terms-data.component.html',
  styleUrls: ['./terms-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
