import { PaginatorLink } from './paginator-link';

export interface Paginator<T> {
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
  data: T[];
}
