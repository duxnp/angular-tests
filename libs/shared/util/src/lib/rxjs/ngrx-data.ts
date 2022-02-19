import { EntityAction, ofEntityType, ofEntityOp, EntityOp } from '@ngrx/data';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filterNullish } from '.';

/**
 * Custom pipeable operator
 * - Filters @ngrx/data entity actions by type and operation
 *
 * @template T
 * @param entityType
 * @param entityOp
 * @returns
 */
export function ofEntityTypeOp<T>(entityType: string, entityOp: EntityOp) {
  return function (source: Observable<Action>) {
    return source.pipe(
      // Workaround to get @ngrx/data pipe operators to work with the @ngrx actions$ stream
      map((action) => action as EntityAction<T>),
      ofEntityType<EntityAction<T>>([entityType]),
      ofEntityOp<EntityAction<T>>([entityOp])
    );
  };
}

/**
 * Custom pipeable operator
 * - Filters by @ngrx/data entity type and operation
 * - Maps to the data contained in the action payload
 * - Filters null entities
 *
 * @param entityType
 * @param entityOp
 * @returns
 */
export function ofEntityTypeOpMapData<T>(
  entityType: string,
  entityOp: EntityOp
) {
  return function (source: Observable<Action>) {
    return source.pipe(
      ofEntityTypeOp<T>(entityType, entityOp),
      map((action) => action.payload.data),
      filterNullish()
    );
  };
}
