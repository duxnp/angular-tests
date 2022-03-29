import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable()
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && control.dirty);
  }
}

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  providers: [CustomErrorStateMatcher],
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent {
  public password = '';

  constructor(public customErrorStateMatcher: CustomErrorStateMatcher) {}
}
