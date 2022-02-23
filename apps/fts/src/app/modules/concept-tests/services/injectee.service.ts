import { Inject, Injectable } from '@angular/core';

@Injectable()
export class InjecteeService {
  foo = '';
  bar = '';

  constructor(@Inject('barValue') private barValue: string) {
    this.bar = barValue;
  }
}
