import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { NgModel, Validators } from '@angular/forms';

import { formViewProvider } from '../../form-view-provider';
import { Like } from '../../model';
import { forbiddenNameValidator } from '../../validation/like-validation';

@Component({
  selector: 'app-like-nested-form',
  templateUrl: './like-nested.component.html',
  viewProviders: [formViewProvider],
})
export class LikeNestedFormComponent implements AfterViewInit {
  static compCounter = 0;

  @Input() like!: Like;
  @Output() remove = new EventEmitter<Like>();
  @ViewChild('name') nameControl!: NgModel;

  grpName = 'Like-' + LikeNestedFormComponent.compCounter++;

  ngAfterViewInit() {
    this.addForbiddenNameValidator();
  }

  // Validator manipulation explained in https://netbasal.com/three-ways-to-dynamically-alter-your-form-validation-in-angular-e5fd15f1e946

  /** Add the ForbiddenName validator which is missing from the template */
  private addForbiddenNameValidator() {
    const formControl = this.nameControl.control;

    formControl.setValidators([Validators.required, forbiddenNameValidator()]);

    // Wait a tick to avoid `ExpressionChangedAfterItHasBeenCheckedError`
    setTimeout(() => formControl.updateValueAndValidity());
  }
}
