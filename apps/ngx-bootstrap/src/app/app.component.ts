import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nbt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log('AppComponent ngOnInit');
  }
}
