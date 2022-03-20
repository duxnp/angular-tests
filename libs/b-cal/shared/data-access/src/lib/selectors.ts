import { createSelector } from '@ngrx/store';

import { RootSelectors } from '@ng-tests/shared/data-access';

import { getBedaysEntities } from './+state/bedays.selectors';

export const selectBedayIdParam = createSelector(
  RootSelectors.selectRouteNestedParams,
  (params) => +(params['bedayId'] as number)
);

export const selectBedayEntity = createSelector(
  selectBedayIdParam,
  getBedaysEntities,
  (id, bedays) => bedays[id]
);
