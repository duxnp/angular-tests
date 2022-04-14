import { Component } from '@angular/core';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tw-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  // @HostBinding('class') class = 'relative';

  isOpen: boolean;
  openMenu = faBars;
  closeMenu = faX;

  constructor() {
    this.isOpen = true;
  }
}
