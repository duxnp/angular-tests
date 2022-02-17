import { Component, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'nbt-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss'],
})
export class DropdownsComponent {
  // Reference firstNameInput variable inside Component
  @ViewChild('dd') dropdownRef!: BsDropdownDirective;

  toggleDropdown() {
    console.log('toggle clicked!');
    this.dropdownRef.toggle(true);
  }
}
