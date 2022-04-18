import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

import { DropdownModule } from '../dropdown/dropdown.component';

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

@NgModule({
  imports: [CommonModule, FontAwesomeModule, DropdownModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
