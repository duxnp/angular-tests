import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticlesApiService } from '../../../../data/service/articles-api.service';
import { Article } from '../../../../data/types/article';
import { Paginator } from '../../../../data/types/paginator';

@Component({
  selector: 'app-articles-index',
  templateUrl: './articles-index.component.html',
  styleUrls: ['./articles-index.component.scss'],
})
export class ArticlesIndexComponent implements OnInit {
  articles$!: Observable<Article[]>;
  paginator$!: Observable<Paginator<Article>>;
  articles!: Article[];
  paginator!: Paginator<Article>;
  currentPage = 1;

  constructor(private articlesApi: ArticlesApiService) {}

  ngOnInit(): void {
    this.paginator = {} as Paginator<Article>;
    this.getPage('1');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ngbPaginatorClicked(event: any) {
    this.getPage(event);
  }

  private getPage(page: string) {
    const params = { page };
    this.paginator$ = this.articlesApi.query(params) as unknown as Observable<
      Paginator<Article>
    >;
    this.paginator$.subscribe((data) => {
      this.paginator = data;
      this.articles = this.paginator.data;
    });
  }
}
