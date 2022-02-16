import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import {
  routerTransition,
  growInOut
} from '@app/core';

// TODO: maybe add SettingsService to the core index.ts
import { SettingsService } from '@app/core/settings/settings.service';

import { environment as env } from '@env/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition, growInOut]
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class') componentCssClass;

  private themeSubscription: Subscription;
  isSmallScreen: boolean;

  navigation = [
    { link: 'about', label: 'About' },
    { link: 'examples/sidenav', label: 'Sidenav' },
    { link: 'examples/toolbars', label: 'Toolbar' },
    { link: 'examples/icons', label: 'Icons' },
    { link: 'examples/inputs', label: 'Inputs' },
    { link: 'examples/loading', label: 'Loading' },
    { link: 'examples/tabs', label: 'Tabs' },
    { link: 'examples/datepicker', label: 'Datepicker' },
    { link: 'examples/snackbar', label: 'Snackbar' },
    { link: 'examples/datatable', label: 'Datatable' }
  ];
  themes: any[];

  constructor(
    public overlayContainer: OverlayContainer,
    public settings: SettingsService,
    private _breakpointObserver: BreakpointObserver
  ) {

  }

  ngOnInit(): void {
    this.themes = this.settings.themeChoices;
    this.themeSubscription = this.settings.$appTheme.subscribe((theme: string) => {
      this.overlayContainer.getContainerElement().classList.remove(this.componentCssClass);
      this.componentCssClass = theme;
      this.overlayContainer.getContainerElement().classList.add(theme);
    });

    this._breakpointObserver
      .observe(['(max-width: 901px)'])
      .pipe(pluck('matches'))
      .subscribe((m: boolean) => this.isSmallScreen = m);
  }

  get sidenavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  setTheme(themeName) {
    this.settings.$appTheme.next(themeName);
  }

}

// Function I saw in the Egghead lesson to create a list of items from I think the router service
// Not really sure exactly what it does yet but it might come in handy
export function createRouteMap(routes: any[]) {
  return routes.reduce((acc: {[key: string]: string }, route) => {
    return { ...acc, [route.path]: route.data.title };
  }, {});
}
