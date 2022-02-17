import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'nbt-demo-dropdown',
  templateUrl: './demo-dropdown.component.html',
  styleUrls: ['./demo-dropdown.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true, insideClick: true } }]
})
export class DemoDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
