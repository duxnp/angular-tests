import { Topping } from '../models/topping.model';
import { Entity } from './entity.model';

export interface Pizza extends Entity {
  id: number;
  name: string;
  toppings: Topping[];
}

export const defaultPizza: Pizza = {
  id: 0,
  name: '',
  toppings: []
}

export class PizzaUtil {
  pizza: Pizza;

  constructor(pizza: Pizza) {
    this.pizza = pizza;
  }

  get isPepPep(): boolean {
    return this.pizza?.name.includes('Pep Pep');
  }
}