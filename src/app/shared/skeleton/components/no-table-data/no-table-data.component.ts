import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "lib-no-table-data",
  templateUrl: "./no-table-data.component.html",
  styleUrls: ["./no-table-data.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoTableDataComponent implements OnInit {

  @Input() imageUrl = "https://assetslogos.s3-eu-west-1.amazonaws.com/frontendassets/icons/icon__no__table__data.svg";
  @Input() title = "No Results Found";
  @Input() description = "Sorry we couldn't find the data you are <br /> looking for..."

  constructor() {}

  ngOnInit() {}
}
