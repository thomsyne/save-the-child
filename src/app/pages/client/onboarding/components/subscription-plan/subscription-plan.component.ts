import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { CurrentSubscriptionPlan } from '@ga/core';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionPlanComponent implements OnInit {

  @Input() plan = "";
  @Input() planData: CurrentSubscriptionPlan;
  @Input() posCost: number;

  @Output() goBack = new EventEmitter();
  @Output() proceed = new EventEmitter();

  total = 0;

  planDetails = {
    numberOfPOS: 0,
    amountOfMonths: 0,
    planName: "",
    subPlan: null,
  };

  ngOnInit() {
    if (this.plan !== "lease") {
      this.planDetails.planName = this.planData.name;
    }
  }

  // setTotal(result) {
  //   if (this.plan !== "lease") {
  //     this.total = result.total;

  //     if (this.plan === "outright") {
  //       this.planDetails.numberOfPOS = result.numberOfPOS;
  //     }

  //     this.planDetails.amountOfMonths = result.amountOfMonths;
  //   } else {
  //     this.planDetails.planName = result.name;
  //     this.planDetails.subPlan = result;
  //   }
  // }

  setTotal(result) {
    if (this.plan === "outright") {
      this.planDetails.planName = result.name;
      this.planDetails.subPlan = result;

      this.planDetails.numberOfPOS = result.maxNumberOfPOSDevices;
      this.planDetails.amountOfMonths = 1;
    } else if (this.plan === "mobile") {
      this.total = result.total;
      this.planDetails.amountOfMonths = result.amountOfMonths;
    } else if (this.plan === "lease") {
      this.planDetails.planName = result.name;
      this.planDetails.subPlan = result;
    }
  }
}