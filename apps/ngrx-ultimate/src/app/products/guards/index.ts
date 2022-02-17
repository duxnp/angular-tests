import { DraftGuard } from './draft.guard';
import { PizzaExistsGuard } from './pizza-exists.guard';
import { PizzasGuard } from './pizzas.guard';
import { ToppingsGuard } from './toppings.guard';

export const guards: any[] = [DraftGuard, PizzasGuard, PizzaExistsGuard, ToppingsGuard];

export * from './draft.guard';
export * from './pizzas.guard';
export * from './pizza-exists.guard';
export * from './toppings.guard';