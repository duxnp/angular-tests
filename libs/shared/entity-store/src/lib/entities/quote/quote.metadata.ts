import { additionalCollectionState } from '@ng-tests/shared/domain';
import { SortComparers } from '@ng-tests/shared/util';

/** Used to help create the entity selectors */
export const metadata = {
  entityName: 'Quote',
  sortComparer: SortComparers.sortByIdDesc,
  additionalCollectionState,
};

/** Used for EntityDataModuleConfig when registering EntityDataModule */
export const entityMetadata = {
  Quote: metadata,
};

export const pluralName = {
  Quote: 'Quotes',
};
