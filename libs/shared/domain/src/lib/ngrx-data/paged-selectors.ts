import { EntityCollection, EntitySelectors } from '@ngrx/data';
import { MemoizedSelector } from '@ngrx/store';
import { EntityPage } from '.';

export interface PagedCollection<T> extends EntityCollection<T> {
  page: EntityPage;
}

export interface PagedSelectors<T> extends EntitySelectors<T> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  selectPage: MemoizedSelector<Object, EntityPage>;
}
