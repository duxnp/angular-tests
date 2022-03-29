/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Pizza } from '../../models/pizza.model';
import * as fromStore from '../../store';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  templateUrl: 'products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  pizzas$!: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // These are now dispatched from within the guards
    // this.store.dispatch(fromStore.loadPizzas());
    // this.store.dispatch(fromStore.loadToppings());
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
  }
}
