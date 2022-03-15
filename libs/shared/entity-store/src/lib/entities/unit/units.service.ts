import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Unit } from '@ng-tests/shared/domain';

@Injectable({ providedIn: 'root' })
export class UnitsService extends EntityCollectionServiceBase<Unit> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Unit', elementsFactory);
  }
}
