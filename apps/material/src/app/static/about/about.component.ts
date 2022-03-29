import { Component } from '@angular/core';

import { ANIMATE_ON_ROUTE_ENTER } from '../../core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
}
