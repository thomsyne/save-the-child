import { Injectable } from '@angular/core';

import { Alert, AlertType } from './alert';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  // convenience methods
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  success(title: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Success, title }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(title: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Error, title }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(title: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Info, title }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(title: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, title }));
  }

  // main alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
