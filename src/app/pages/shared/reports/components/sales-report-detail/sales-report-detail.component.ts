import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerOrder } from 'src/app/pages/client/customers';
import { CustomerService } from 'src/app/pages/client/customers/services/customers.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales-report-detail.component.html',
  styleUrls: ['./sales-report-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesReportDetailComponent implements OnInit {

  reportId: number;
  reportOrder$: Observable<CustomerOrder>;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.reportId = this.route.snapshot.params["id"];
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.reportOrder$ = this.customerService.fetchSingleOrderDetail(this.reportId);
  }

}
