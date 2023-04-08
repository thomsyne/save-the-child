import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { CurrentSubscriptionPlan } from '@ga/core';

@Component({
  selector: 'app-outright-plan',
  templateUrl: './outright-plan.component.html',
  styleUrls: ['./outright-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutrightPlanComponent implements OnInit {

  @Input() durationCost: number;
  @Input() posCost = 95500;
  @Input() subPlans: CurrentSubscriptionPlan[];
  @Output() planSelected = new EventEmitter();
  selectedOption = "null";

  numberOfPOS = 1;
  amountOfMonths = 1;

  @Output() onTotalReceived = new EventEmitter();

  constructor() {}

  // changePOS(change: "increase" | "decrease") {
  //   if (change == "increase") {
  //     this.numberOfPOS++;
  //   } else if (change == "decrease" && this.numberOfPOS > 1) {
  //     this.numberOfPOS--;
  //   }
  //   this.emit();
  // }

  // changeDuration(change: "increase" | "decrease") {
  //   if (change == "increase" && this.amountOfMonths < 12) {
  //     this.amountOfMonths++;
  //   } else if (change == "decrease" && this.amountOfMonths > 1) {
  //     this.amountOfMonths--;
  //   }
  //   this.emit();
  // }

  // emit() {
  //   this.onTotalReceived.emit({
  //     total:
  //       this.numberOfPOS * this.posCost +
  //       this.amountOfMonths * this.durationCost,
  //     numberOfPOS: this.numberOfPOS,
  //     amountOfMonths: this.amountOfMonths,
  //   });
  // }

  ngOnInit() {
    // this.emit();
  }
}
