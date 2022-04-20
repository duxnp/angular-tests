import { Component } from '@angular/core';

@Component({
  selector: 'bcw-mobile-root',
  template: `<ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
