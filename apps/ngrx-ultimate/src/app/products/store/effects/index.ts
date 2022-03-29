import { PizzasEffects } from './pizzas.effect';
import { ToppingsEffects } from './topping.effect';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const effects: any[] = [PizzasEffects, ToppingsEffects];

export * from './pizzas.effect';
export * from './topping.effect';
