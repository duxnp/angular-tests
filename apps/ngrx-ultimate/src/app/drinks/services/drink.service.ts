import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Drink } from '../models/drink.model';

@Injectable({
  providedIn: 'root',
})
export class DrinkService extends EntityCollectionServiceBase<Drink> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Drink', serviceElementsFactory);
  }
}
