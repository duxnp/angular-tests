import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Drink } from '../../models/drink.model';

@Component({
  selector: 'app-drink-form',
  templateUrl: './drink-form.component.html',
  styleUrls: ['./drink-form.component.scss'],
})
export class DrinkFormComponent {
  @Output() create = new EventEmitter<Drink>();

  form = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  createDrink(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }
}
