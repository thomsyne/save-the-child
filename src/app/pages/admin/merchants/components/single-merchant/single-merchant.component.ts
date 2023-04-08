import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-merchant',
  templateUrl: './single-merchant.component.html',
  styleUrls: ['./single-merchant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleMerchantComponent implements OnInit {

  id: number;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.id = params["id"];
  }

}