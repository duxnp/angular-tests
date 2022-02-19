import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { deferredGet } from '.';

export const valueChanges = (
  formGroup: FormGroup,
  control: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Observable<any> => {
  return deferredGet(formGroup, control).pipe(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    switchMap((val) => val?.valueChanges as Observable<any>)
  );
};
