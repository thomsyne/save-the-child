import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merchant-billing-report',
  templateUrl: './merchant-billing-report.component.html',
  styleUrls: ['./merchant-billing-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantBillingReportComponent implements OnInit {

  id: number;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.parent.params["id"];
  }

}
