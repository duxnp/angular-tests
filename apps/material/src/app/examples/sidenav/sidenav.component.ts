import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';

import { growInOut } from '../../core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [growInOut],
})
export class SidenavComponent implements OnInit {
  isSmallScreen = false;

  navigation = [
    { link: 'about', label: 'About' },
    { link: 'examples', label: 'Examples' },
  ];
  // ... is called a spread operator
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Settings' },
  ];

  constructor(
    public overlayContainer: OverlayContainer,
    private _breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this._breakpointObserver
      .observe(['(max-width: 901px)'])
      .pipe(pluck('matches'))
      .subscribe((m: boolean) => (this.isSmallScreen = m));
  }

  get sidenavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }
}
