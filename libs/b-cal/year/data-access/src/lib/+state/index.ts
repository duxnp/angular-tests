import { createSelector } from '@ngrx/store';

import { BedaysSelectors } from '@ng-tests/b-cal/shared/data-access';
import { RootSelectors } from '@ng-tests/shared/data-access';

export const selectBedayId = createSelector(
  RootSelectors.selectRouteNestedParams,
  (params) => +(params['bedayId'] as number)
);

export const selectBedayEntity = createSelector(
  selectBedayId,
  BedaysSelectors.getBedaysEntities,
  (id, bedays) => bedays[id]
);
