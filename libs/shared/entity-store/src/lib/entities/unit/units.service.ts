import { Injectable } from '@angular/core';
import { Unit } from '@angular-tests/shared/domain';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class UnitsService extends EntityCollectionServiceBase<Unit> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Unit', elementsFactory);
  }
}
