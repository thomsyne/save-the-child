import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-subscription-option',
  templateUrl: './subscription-option.component.html',
  styleUrls: ['./subscription-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionOptionComponent implements OnInit {

  @Input() allowPlanSelect: boolean;
  @Output() proceed = new EventEmitter<string>();
  selectedPlan = "";

  constructor() { }

  ngOnInit(): void {
  }

  selectPlan(plan:string) {
    this.selectedPlan = plan;
    this.proceed.emit(plan);
  }

}
