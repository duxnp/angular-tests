import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  EntityCollectionService,
} from '@ngrx/data';
import { createSelector } from '@ngrx/store';

import * as fromEntities from './entities';

/**
 * I can just put all the entity definitions here or if this gets too big I can
 * put stuff in the /entities/... folder
 */
const entityMetadata: EntityMetadataMap = {
  ...fromEntities.entityMetadata,
  Company: {},
  Unit: {},
  User: {},
};

const pluralNames = {
  ...fromEntities.pluralNames,
  Company: 'Companies',
  Unit: 'Units',
  User: 'Users',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

export const getEntity = (ecs: EntityCollectionService<any>, id: number) => {
  const selectEntityMap = ecs.selectors.selectEntityMap;
  createSelector(selectEntityMap, (entities) => {
    return entities[id];
  });
};
