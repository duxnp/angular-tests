import { EntityPage } from '.';

export interface AdditionalCollectionState {
  page: EntityPage;
}
export const additionalCollectionState: AdditionalCollectionState = {
  page: {
    currentPage: 0,
    nextPageUrl: '',
    pageIds: [],
  },
};
