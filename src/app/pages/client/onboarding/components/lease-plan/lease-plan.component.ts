import { StorageService } from './../../../../../core/services/storage.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { CurrentSubscriptionPlan } from "@ga/core";

@Component({
  selector: "app-lease-plan",
  templateUrl: "./lease-plan.component.html",
  styleUrls: ["./lease-plan.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeasePlanComponent implements OnInit {
  @Input() subPlans: CurrentSubscriptionPlan[];
  posCost = 96000;
  @Output() planSelected = new EventEmitter();
  selectedOption = "null";

  userDetails = this.storageService.getLoggedInUser();
  constructor(
    private storageService: StorageService
  ) {}

  ngOnInit() {
    console.log(this.userDetails)
  }
}
