import { FormGroup, AbstractControl } from '@angular/forms';
import { Observable, interval } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

// This was created to solve the problem with template driven forms not
// being fully initialized until AFTER the first round of lifecycle hooks
// I needed something that would keep trying until it succeeded.
// eslint-disable-next-line arrow-body-style
export const deferredGet = (
  formGroup: FormGroup,
  control: string
): Observable<AbstractControl | null> => {
  return interval(250).pipe(
    map(() => formGroup.get(control)),
    filter((control) => control != null),
    // takeWhile((control) => control == null, true)
    take(1)
  );
};
