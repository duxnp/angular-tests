import { SortComparers } from '@hmi-doors/shared/util';
import { additionalCollectionState } from '@hmi-doors/shared/domain';

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
