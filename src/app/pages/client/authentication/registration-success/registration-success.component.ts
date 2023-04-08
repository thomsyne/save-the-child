import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationSuccessComponent implements OnInit {
  entityCode: string = ''

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {

    this.entityCode = this.route.snapshot.queryParams["ce"];
  }

  routeAway(){
    this.router.navigate(['/login'])
  }

}
