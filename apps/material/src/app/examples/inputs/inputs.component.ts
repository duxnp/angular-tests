import { Component, OnInit, Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';


@Injectable()
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && control.dirty);
  }
}

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  providers: [CustomErrorStateMatcher],
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {

  public password = '';

  constructor(
    public customErrorStateMatcher: CustomErrorStateMatcher
  ) { }

  ngOnInit() {
  }

}
