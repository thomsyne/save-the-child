import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqsComponent {

  activeFragment$ = this.route.fragment;
  constructor(
    private route: ActivatedRoute
  ) { }

}
