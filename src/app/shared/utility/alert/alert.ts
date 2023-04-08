export class Alert {
  id?: string = '';
  type!: AlertType;
  title = '';
  autoClose = true;
  keepAfterRouteChange?: boolean;
  isFlag?: boolean = true;
  message?: string;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
    this.isFlag = !this.message;
    this.autoClose = !this.message;
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
