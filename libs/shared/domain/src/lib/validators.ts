import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export type ValidatorFnRn = { [key: string]: any } | null;

export type AsyncValidatorFnRn =
  | Promise<ValidationErrors | null>
  | Observable<ValidationErrors | null>;
