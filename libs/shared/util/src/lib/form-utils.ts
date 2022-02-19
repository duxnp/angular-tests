import {
  AbstractControl,
  FormGroup,
  NgModelGroup,
  ValidationErrors,
} from '@angular/forms';
import { Observable, interval } from 'rxjs';
import { filter, map, takeWhile } from 'rxjs/operators';

export class FormUtils {
  // This was created to solve the problem with template driven forms not
  // being fully initialized until AFTER the first round of lifecycle hooks
  // I needed something that would keep trying until it succeeded.
  // eslint-disable-next-line arrow-body-style
  static getControlAsync = (
    formGroup: FormGroup,
    control: string
  ): Observable<AbstractControl | null> => {
    return interval(250).pipe(
      map(() => formGroup.get(control)),
      filter((val) => val != null),
      takeWhile((val) => val == null, true)
    );
  };

  // Collect a list of errors from each FormControl in the FormGroup
  static getFormGroupErrors(form: FormGroup) {
    // let totalErrors = 0;
    const errors: { [key: string]: ValidationErrors } = {};

    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      // const controlErrors: ValidationErrors = form.get(key).errors;

      if (
        control &&
        control.errors != null &&
        (control.touched || control.dirty)
      ) {
        errors[key] = control.errors;

        /* Example of counting the number of errors */
        // Object.keys(control.errors).forEach((keyError) => {
        //   totalErrors++;
        //   console.log(
        //     'Control: ' + key + ', Error: ' + keyError + ', Value: ',
        //     controlErrors[keyError]
        //   );
        // });
      }
    });

    return errors;
  }

  static getErrorCount(group: string, form: FormGroup): number {
    const formGroup = form.controls[group] as unknown as FormGroup;
    if (formGroup !== undefined) {
      const groupErrors = this.getFormGroupErrors(formGroup);
      return Object.keys(groupErrors).length;
    }

    return 0;
  }

  static updateValidity(group: NgModelGroup, controlName: string) {
    group.control?.controls[controlName].updateValueAndValidity();
  }
  static updateValidityRx(group: FormGroup, controlName: string) {
    group.controls[controlName].updateValueAndValidity({ emitEvent: false });
  }

  static hasValidator(
    form: FormGroup,
    controlPath: string,
    validator: string
  ): boolean {
    const control = form.get(controlPath);
    let errors: ValidationErrors | null = null;

    if (control && control.validator) {
      errors = control.validator({} as AbstractControl);
    }

    if (errors) {
      return !!Object.prototype.hasOwnProperty.call(errors, validator);
    }

    return false;
  }

  static getControlName(control: AbstractControl) {
    let controlName = null;
    const parent = control.parent;

    // only such parent, which is FormGroup, has a dictionary
    // with control-names as a key and a form-control as a value
    if (parent instanceof FormGroup) {
      // now we will iterate those keys (i.e. names of controls)
      Object.keys(parent.controls).forEach((name) => {
        // and compare the passed control and
        // a child control of a parent - with provided name (we iterate them all)
        if (control === parent.controls[name]) {
          // both are same: control passed to Validator
          //  and this child - are the same references
          controlName = name;
        }
      });
    }
    // we either found a name or simply return null
    return controlName;
  }
}
