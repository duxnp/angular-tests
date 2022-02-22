import { Inject, Injectable } from '@angular/core';
import { EntityPageState } from '@angular-tests/shared/domain';
import { ComponentStore } from '@ngrx/component-store';
import { EntityServices, QueryParams } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { ToastsActions } from '@angular-tests/shared/toasts/data-access';
import { RootSelectors } from '@angular-tests/shared/root/data-access';

// TODO: may be able to change this
type MassAssignable<T> = Pick<EntityPageState<T>, 'hasMore' | 'loading'>;

type Direction = 'previous' | 'current' | 'next';

const initialState = {
  entities: [],
  expired: true,
  hasMore: false,
  loading: false,
  pageNumber: 1,
  perPage: 10,
};

@Injectable()
export class EntityPaginationService<T> extends ComponentStore<
  EntityPageState<T>
> {
  entityService = this.entityServices.getEntityCollectionService(
    this.entityName
  );

  loading$ = this.entityService.loading$;
  nextPageUrl$: Observable<string> =
    this.entityService.selectors$['nextPageUrl$'];
  hasMore$: Observable<boolean> = this.nextPageUrl$.pipe(
    map((url) => url !== null && url !== '')
  );
  queryParams$ = this.store.select(RootSelectors.selectQueryParams);

  constructor(
    @Inject('entityName') private entityName: string,
    private entityServices: EntityServices,
    private store: Store
  ) {
    super(initialState);

    // this.entityServices.entityActionErrors$.subscribe((e) => console.log(e));
    // this.entityService.errors$.subscribe((e) => console.log(e));
    // this.queryParams$.subscribe((e) => console.log(e));
  }

  // SELECTORS
  private readonly expired$: Observable<boolean> = this.select(
    (state) => state.expired
  );

  private readonly pageNumber$: Observable<number> = this.select(
    (state) => state.pageNumber
  );

  private readonly perPage$: Observable<number> = this.select(
    (state) => state.perPage
  );

  // ViewModel for the component
  readonly vm$: Observable<EntityPageState<T>> = this.select((state) => state);

  // UPDATERS
  readonly updateExpired = this.updater(
    (state: EntityPageState<T>, expired: boolean) => {
      return { ...state, expired };
    }
  );

  readonly updatePageNumber = this.updater(
    (state: EntityPageState<T>, pageNumber: number) => {
      return { ...state, pageNumber, expired: true };
    }
  );

  readonly updateEntities = this.updater(
    (state: EntityPageState<T>, entities: T[]) => {
      return { ...state, entities };
    }
  );

  readonly updateRest = this.updater(
    (state: EntityPageState<T>, props: MassAssignable<T>) => {
      return { ...state, ...props, expired: false };
    }
  );

  // EFFECTS
  // Advange page number in either direction with boundary protection
  readonly changePage = this.effect((direction$: Observable<Direction>) => {
    return direction$.pipe(
      withLatestFrom(this.state$),
      tap(([direction, state]) => {
        let page = state.pageNumber;

        switch (direction) {
          case 'previous': {
            if (page > 1) {
              page = page - 1;
            }
            break;
          }
          case 'next': {
            if (state.hasMore) {
              page = page + 1;
            }
            break;
          }
        }

        this.updatePageNumber(page);
      })
    );
  });

  // Fetch more entities from the entityService when the page changes
  // This is similar to an @ngrx/effect listening to an action with no payload
  readonly pageChanged = this.effect(() => {
    return this.expired$.pipe(
      filter((expired) => expired),
      withLatestFrom(this.pageNumber$, this.queryParams$),
      tap(([expired, page, queryParams]) => {
        const params: QueryParams = {
          page: `${page}`,
          ...queryParams,
        };
        this.getPage(params);
      })
    );
  });

  // Refilter the entities when certain values change
  readonly entityStoreEntitiesChanged = this.effect(() => {
    return this.entityService.entities$.pipe(
      withLatestFrom(this.pageNumber$, this.perPage$),
      tap(([entities, pageNumber, perPage]) => {
        const start = pageNumber * perPage - perPage;
        const end = start + perPage;
        const filtered = entities.slice(start, end);
        this.updateEntities(filtered);
      })
    );
  });

  // These are together because we can just grab the values without any further processing
  readonly restChanged = this.effect(() => {
    return combineLatest([this.hasMore$, this.loading$]).pipe(
      tap(([hasMore, loading]) => this.updateRest({ hasMore, loading }))
    );
  });

  getPage(params: QueryParams) {
    this.entityService.getWithQuery(params).pipe(
      catchError((error) => {
        const content =
          'There was a problem loading data. Please try again later.';
        this.entityServices.dispatch(ToastsActions.danger({ content }));
        return throwError(error);
      })
    );
  }

  // Actions
  previous() {
    this.changePage('previous');
  }

  refresh() {
    this.updateExpired(true);
  }

  next() {
    this.changePage('next');
  }
}
