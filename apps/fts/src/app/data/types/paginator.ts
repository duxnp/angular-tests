import { PaginatorLink } from './paginator-link';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Paginator {
  total?: number;
  per_page: number;
  current_page: number;
  last_page?: number;
  first_page_url: string;
  last_page_url?: string;
  next_page_url: string;
  prev_page_url: string;
  links?: PaginatorLink[];
  path: string;
  from: number;
  to: number;
  data: any;
}
