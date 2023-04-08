import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { MsalService, StorageService } from "@ga/core";
import { LoaderComponent } from "@ga/utility";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;

  subscription: Subscription;

  constructor(
    public msalService: MsalService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.clearStorage();
    this.subscription = this.msalService.loadingStatus$.subscribe((value) => {
      if (value) {
        this.loader.start();
      } else {
        this.loader.end();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
