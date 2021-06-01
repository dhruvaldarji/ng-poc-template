import { Component, OnInit, OnDestroy, VERSION } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppService } from './services/app.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {

  readonly appTheme$ = this.themeService.getAppTheme();

  readonly appName$ = this.appService.getAppName();
  readonly appSubtitle$ = this.appService.getAppDescription();
  readonly appInstructions$ = this.appService.getAppInstructions();

  readonly NG_VERSION = `v${VERSION.major}`;

  private readonly destroy$ = new Subject();

  constructor(private readonly appService: AppService, private readonly themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.setTheme().pipe(takeUntil(this.destroy$)).subscribe();

    this.appService.setAppName(/** [ Add your instructions here ] **/);
    this.appService.setAppDescription(/** [ Add your instructions here ] **/);
    this.appService.setAppInstructions(/** [ Add your instructions here ] **/);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
