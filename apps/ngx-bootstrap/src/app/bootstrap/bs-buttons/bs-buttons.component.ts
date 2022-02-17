import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nbt-bs-buttons',
  templateUrl: './bs-buttons.component.html',
  styleUrls: ['./bs-buttons.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BsButtonsComponent implements OnInit {
  buttonStyles: string[];

  // Constructor executed first
  constructor() {
    this.buttonStyles = [
      'primary',
      'secondary',
      'success',
      'info',
      'warning',
      'danger',
      'link',
    ];
  }

  // ngOnInit is called after the constructor is executed
  ngOnInit(): void {
  }

}
