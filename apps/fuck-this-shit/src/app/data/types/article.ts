/* eslint-disable @typescript-eslint/naming-convention */
export interface Article {
  id?: number;
  user_id?: number;
  title: string;
  excerpt: string;
  body: string;
  created_at?: string;
  updated_at?: string;
}
