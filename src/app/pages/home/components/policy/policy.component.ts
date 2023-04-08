import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ploicy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyComponent {

  activeFragment$ = this.route.fragment;
  constructor(
    private route: ActivatedRoute
  ) { }

}
