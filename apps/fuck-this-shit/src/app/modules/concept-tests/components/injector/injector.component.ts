import { Component, OnInit } from '@angular/core';
import { InjecteeService } from '../../services/injectee.service';

@Component({
  selector: 'app-injector',
  templateUrl: './injector.component.html',
  styleUrls: ['./injector.component.scss'],
  providers: [InjecteeService, { provide: 'barValue', useValue: 'injector' }],
})
export class InjectorComponent implements OnInit {
  constructor(private injectee: InjecteeService) {}

  ngOnInit(): void {
    this.injectee.foo = 'ye';
  }
}
