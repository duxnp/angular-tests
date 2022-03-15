import { Component, OnInit } from '@angular/core';

import { InjecteeService } from '../../services/injectee.service';

@Component({
  selector: 'app-injector-two',
  templateUrl: './injector-two.component.html',
  styleUrls: ['./injector-two.component.scss'],
  providers: [
    InjecteeService,
    { provide: 'barValue', useValue: 'injector-two' },
  ],
})
export class InjectorTwoComponent implements OnInit {
  constructor(private injectee: InjecteeService) {}

  ngOnInit(): void {
    this.injectee.foo = 'mort';
  }
}
