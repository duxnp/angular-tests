import { Entity } from './entity.model';

export interface Topping extends Entity {
  id: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
