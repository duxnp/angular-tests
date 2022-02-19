/** Used in @ngrx/data additionalCollectionState NOT that one ComponentStore */
export interface EntityPage {
  currentPage: number;
  nextPageUrl: string;
  pageIds: number[];
}
