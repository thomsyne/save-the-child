import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-entity-orders',
  templateUrl: './entity-orders.component.html',
  styleUrls: ['./entity-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityOrdersComponent implements OnInit {

  entityName: string = ''

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.entityName = this.route.snapshot.queryParamMap.get('name')
  }

}
