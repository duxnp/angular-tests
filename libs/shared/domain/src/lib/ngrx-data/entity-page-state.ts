/** Used in EntityPaginationService component store */
export interface EntityPageState<T> {
  entities: T[];
  expired: boolean;
  hasMore: boolean;
  loading: boolean;
  pageNumber: number;
  perPage: number;
}
