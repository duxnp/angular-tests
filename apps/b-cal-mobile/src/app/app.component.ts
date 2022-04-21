import { Component } from '@angular/core';

@Component({
  selector: 'bcw-mobile-root',
  template: `<ion-app>
    <router-outlet></router-outlet>
  </ion-app>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
