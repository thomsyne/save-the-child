import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'lib-skeleton-table',
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonTableComponent implements OnInit {

  @Input() numberOfColumns!: number;
  columns = new Array(this.numberOfColumns);

  constructor() { }

  ngOnInit() {
    this.columns = new Array(this.numberOfColumns);
  }

}
