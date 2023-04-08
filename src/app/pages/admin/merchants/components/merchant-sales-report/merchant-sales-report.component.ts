import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merchant-sales-report',
  templateUrl: './merchant-sales-report.component.html',
  styleUrls: ['./merchant-sales-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantSalesReportComponent implements OnInit {

  id: number;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.parent.params["id"];
  }

}
