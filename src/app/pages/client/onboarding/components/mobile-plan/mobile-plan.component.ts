import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-plan',
  templateUrl: './mobile-plan.component.html',
  styleUrls: ['./mobile-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobilePlanComponent implements OnInit {
  @Input() durationCost: number;

  @Output() onTotalReceived = new EventEmitter();
  @Output() changePlan = new EventEmitter();

  amountOfMonths = 1;

  constructor() {}

  ngOnInit() {
    this.emit();
  }

  changeDuration(change: "increase" | "decrease") {
    if (change == "increase" && this.amountOfMonths < 12) {
      this.amountOfMonths++;
    } else if (change == "decrease" && this.amountOfMonths > 1) {
      this.amountOfMonths--;
    }
    this.emit();
  }

  emit() {
    this.onTotalReceived.emit({
      total: this.amountOfMonths * this.durationCost,
      amountOfMonths: this.amountOfMonths,
    });
  }
}