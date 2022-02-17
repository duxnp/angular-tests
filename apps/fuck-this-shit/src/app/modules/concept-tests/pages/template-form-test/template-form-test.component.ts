import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form-test',
  templateUrl: './template-form-test.component.html',
  styleUrls: ['./template-form-test.component.scss'],
})
export class TemplateFormTestComponent implements OnInit {
  @ViewChild('form', { static: true }) ngForm!: NgForm;

  name = 'Angular ' + VERSION.full;
  options = {
    o1: true,
    o2: false,
  };

  ngOnInit() {
    this.ngForm.form.valueChanges.subscribe((x) => {
      console.log(x);
    });
  }
}
