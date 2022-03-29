import { PizzasService } from './pizzas.service';
import { ToppingsService } from './toppings.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const services: any[] = [PizzasService, ToppingsService];

export * from './pizzas.service';
export * from './toppings.service';
