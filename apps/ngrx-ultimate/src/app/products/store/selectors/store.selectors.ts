import { createSelector } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';
import { getSelectedPizza } from './pizzas.selectors';
import { getToppingsSelected } from './toppings.selectors';

// export const getVisualizedPizza = createSelector(
//   getSelectedPizza,
//   getToppingsSelected,
//   (pizza, toppings): Pizza => {
//     return { ...pizza, toppings };
//   }
// );