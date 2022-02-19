export interface ApiPaginated<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  next_page_url: string;
  per_page: number;
  prev_page_url: string;
  to: number;
}
