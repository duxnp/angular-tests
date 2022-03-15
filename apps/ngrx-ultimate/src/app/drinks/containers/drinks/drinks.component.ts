import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Drink } from '../../models/drink.model';
import { DrinkService } from '../../services/drink.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})
export class DrinksComponent implements OnInit {
  loading$: Observable<boolean>;
  drinks$: Observable<Drink[]>;

  constructor(private drinkService: DrinkService) {
    this.drinks$ = drinkService.entities$;
    this.loading$ = drinkService.loading$;
  }

  ngOnInit() {
    this.getDrinks();
  }

  add(drink: Drink) {
    this.drinkService.add(drink);
  }

  delete(drink: Drink) {
    this.drinkService.delete(drink.id);
  }

  getDrinks() {
    this.drinkService.getAll();
  }

  getDrink(id: number) {
    this.drinkService.getByKey(id);
  }

  update(drink: Drink) {
    this.drinkService.update(drink);
  }

  onCreate(drink: Drink) {
    this.add(drink);
  }

  onDelete(drink: Drink) {
    this.delete(drink);
  }
}
