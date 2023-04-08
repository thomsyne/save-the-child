import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import {
  AuthService,
  LoggedInUserObject,
  StorageService,
  UserDetails,
} from "@ga/core";
import { Subscription } from "rxjs";

@Component({
  selector: "lib-top-navigation",
  templateUrl: "./top-navigation.component.html",
  styleUrls: ["./top-navigation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigationComponent implements OnInit, OnDestroy {
  initials: string;
  user: UserDetails;
  subscriptions: Subscription[] = [];

  // @Input() user: string;
  @Input() links: string;

  @Output() clickLink = new EventEmitter();
  @Output() toggleHamburger = new EventEmitter();

  constructor(
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    window.onbeforeunload = () => this.ngOnDestroy();

    this.subscriptions.push(
      this.storageService.userData$.subscribe((user) => {
        this.user = user.userDetails;

        const names = `${this.user.firstName} ${this.user.lastName}`.split(" ");

        if (names.length > 1) {
          this.initials = `${names[0][0]}${names[1][0]}`.toUpperCase();
        } else {
          this.initials = `${names[0][0]}`.toUpperCase();
        }
        this.changeDetector.markForCheck();
      })
    );
  }

  linkClicked(linkName: string) {
    this.clickLink.emit(linkName);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }
}
