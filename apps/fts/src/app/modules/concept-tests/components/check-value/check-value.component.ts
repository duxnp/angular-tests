import { Component } from '@angular/core';

import { InjecteeService } from '../../services/injectee.service';

@Component({
  selector: 'app-check-value',
  templateUrl: './check-value.component.html',
  styleUrls: ['./check-value.component.scss'],
})
export class CheckValueComponent {
  constructor(private injectee: InjecteeService) {}

  checkFoo() {
    console.log(this.injectee.foo);
    console.log(this.injectee.bar);
  }
}
