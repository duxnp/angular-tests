import { Entity } from "./entity.model";

export interface Topping extends Entity {
  id: number;
  name: string;
  [key: string]: any;
}
