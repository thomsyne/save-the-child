import { IMAGES } from "./alert.constants";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AlertService } from "../alert.service";
import { Alert, AlertType } from "../alert";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { slideAnimation } from "../../animations";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
  animations: [slideAnimation],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = "default-alert";
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert: Alert) => {
        // clear alerts when an empty alert is received
        if (!alert.title) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach((x) => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.alerts.push(alert);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 4000);
        }
      });

    // clear alerts on location change
    //   this.routeSubscription = this.router.events.subscribe((event: any) => {
    //       if (event instanceof NavigationStart) {
    //           this.alertService.clear(this.id);
    //       }
    //   });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    //this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    // remove alert
    this.alerts = this.alerts.filter((x) => x !== alert);
  }

  getLeadingImage(classes: string): string | undefined {
    const stateClass = classes.split(" ")[1];
    return IMAGES.get(stateClass);
  }

  getImageClass(alert: Alert): string {
    return alert.isFlag ? "flag-image" : "alert-image";
  }

  cssClass(alert: Alert): string {
    const type = alert.isFlag ? "flag" : "alert";
    const classes = [type];

    const alertTypeClass = {
      [AlertType.Success]: `${type}-success`,
      [AlertType.Error]: `${type}-failure`,
      [AlertType.Info]: `${type}-info`,
      [AlertType.Warning]: `${type}-warning`,
    };

    classes.push(alertTypeClass[alert.type]);

    return classes.join(" ");
  }
}
