import { EntityService } from './../../../pages/admin/entities/services/entity.service';
import { StorageService } from './../../../core/services/storage.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef,
} from "@angular/core";
import { SideNavigation } from "../model";

@Component({
  selector: "lib-side-navigation",
  templateUrl: "./side-navigation.component.html",
  styleUrls: ["./side-navigation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationComponent implements OnInit {
  @Input() navConfig: SideNavigation[];
  @Input() navConfigMinor: SideNavigation[];
  @Input() permissions!: string[];

  @Input() isNavOpen: boolean;
  @Output() toggleHamburger = new EventEmitter();

  easeOut = false;

  constructor(
    private entityService: EntityService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    if (this.storage.userEntity()){
      this.getEntityDetail(this.storage.userEntity())
    }
   }

  close() {
    this.easeOut = true;

    setTimeout(() => {
      this.easeOut = false;
      this.toggleHamburger.emit();
    }, 500);
  }

  getEntityDetail(entityCode: string){
    this.entityService.fetchSingleEntity(entityCode).subscribe((res) => {

      if (!res.data.isActive) return;

      document
        .getElementById("sidenav-img")
        .setAttribute("src", 'assets/images/logo-2.png');

      document
        .getElementById("sidenav-img")
        .style.objectFit = 'contain'
    });
  }

}
