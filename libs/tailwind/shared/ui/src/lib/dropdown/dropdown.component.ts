import { CommonModule } from '@angular/common';
import { Component, HostListener, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'tw-dropdown',
  templateUrl: './dropdown.component.html',
  styles: [],
})
export class DropdownComponent {
  isOpen: boolean;

  // https://juristr.com/blog/2016/09/ng2-event-registration-document/
  // ALL keydown events
  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // Then check for escape key
    if (e.key === 'Esc' || e.key === 'Escape') {
      console.log(`The user just pressed ${e.key}!`);
    }
  }

  // Only escape keydown events
  @HostListener('document:keydown.escape', ['$event'])
  onKeyDownEscape(e: KeyboardEvent) {
    console.log(`The user REALLY just pressed ${e.key}!`);
    this.isOpen = false;
  }

  constructor() {
    this.isOpen = false;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
})
export class DropdownModule {}
