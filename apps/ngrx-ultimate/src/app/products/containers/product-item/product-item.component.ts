/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Pizza, PizzaUtil } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import * as fromStore from '../../store';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit {
  draft$!: Observable<Pizza>;
  draftUtil$!: Observable<PizzaUtil>;
  pizza$!: Observable<Pizza>;
  toppings$!: Observable<Topping[]>;

  test$!: Observable<Pizza>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.draft$ = this.store.select(fromStore.getDraftEntity);
    this.draftUtil$ = this.store.select(fromStore.getDraftUtil);
    this.pizza$ = this.store.select(fromStore.getSelectedPizza);
    this.toppings$ = this.store.select(fromStore.getAllToppings);

    // this.test$ = combineLatest([
    //   this.store.select(fromStore.selectAnId),
    //   this.store.select(fromStore.getPizzaEntities)
    // ]).pipe(
    //   map(([id, pizzas]) => pizzas[id] as Pizza)
    // );

    this.test$ = this.store
      .select(fromStore.selectAnId)
      .pipe(switchMap((id) => this.store.select(fromStore.selectPizza(id))));

    // this.visualise$ = this.store.select(fromStore.getVisualizedPizza);
    // this.pizza$.subscribe(
    //   (pizza) => {
    //     this.store.dispatch(fromStore.setToppings({ payload: pizza.toppings }));
    //   }
    // ).unsubscribe();

    // this.pizza$.subscribe(
    //   (pizza) => {
    //     this.store.dispatch(fromStore.setDraft({ payload: pizza }));
    //   }
    // ).unsubscribe();
  }

  onSelect(event: number[]) {
    console.log('on select');
    console.log(event);
    this.store.dispatch(fromStore.setToppingsByID({ payload: event }));
  }

  onChanged(event: Pizza) {
    this.store.dispatch(fromStore.productItemSetDraft({ payload: event }));
  }

  onCreate(pizza: Pizza) {
    this.store.dispatch(fromStore.createPizza({ pizza }));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(fromStore.updatePizza({ pizza: event }));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(fromStore.removePizza({ pizza: event }));
    }
  }
}
