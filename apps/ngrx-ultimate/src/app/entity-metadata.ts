import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  DefaultDataServiceConfig,
} from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Drink: {},
};

const pluralNames = { Drink: 'Drinks' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000/api',
  timeout: 3000, // request timeout
};
