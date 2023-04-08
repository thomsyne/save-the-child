import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-audit-logs-container',
  templateUrl: './audit-logs-container.component.html',
  styleUrls: ['./audit-logs-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuditLogsContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
