import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MonitoringService,
} from '@shared/services';

@Component({
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    private _logger: MonitoringService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._logger.logException({
      message: `User landed on '${this._router.url}' somehow.`,
      name: 'PageNotFound',
    })
  }
}
