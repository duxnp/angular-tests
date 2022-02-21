import { Injectable } from '@angular/core';
import { Unit } from '@hmi-doors/shared/domain';
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
