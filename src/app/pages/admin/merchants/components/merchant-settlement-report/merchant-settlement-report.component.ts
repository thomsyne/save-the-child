import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merchant-settlement-report',
  templateUrl: './merchant-settlement-report.component.html',
  styleUrls: ['./merchant-settlement-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantSettlementReportComponent implements OnInit {

  id: number;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.parent.params["id"];
  }

}
