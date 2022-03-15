import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'nbt-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  checkModel: any = { left: false, middle: true, right: false };
  singleModel = '1';
  myForm!: FormGroup;
  radioModel = 'Middle';
  uncheckableRadioModel = 'Middle';
  myRadioForm!: FormGroup;

  // inputModel = 'hey';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      left: false,
      middle: true,
      right: false,
    });

    this.myRadioForm = this.formBuilder.group({
      radio: 'C',
    });
  }
}
