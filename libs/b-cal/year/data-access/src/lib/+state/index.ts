import { createSelector } from '@ngrx/store';
import { RootSelectors } from '@angular-tests/shared/data-access';
import { BedaysSelectors } from '@angular-tests/b-cal/shared/data-access';

export const selectBedayId = createSelector(
  RootSelectors.selectRouteNestedParams,
  (params) => +(params['bedayId'] as number)
);

export const selectBedayEntity = createSelector(
  selectBedayId,
  BedaysSelectors.getBedaysEntities,
  (id, bedays) => bedays[id]
)