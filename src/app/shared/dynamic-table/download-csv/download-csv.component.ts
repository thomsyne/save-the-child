import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "lib-download-csv",
  templateUrl: "./download-csv.component.html",
  styleUrls: ["./download-csv.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadCsvComponent implements OnInit {
  @Output() downloadCsv = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
