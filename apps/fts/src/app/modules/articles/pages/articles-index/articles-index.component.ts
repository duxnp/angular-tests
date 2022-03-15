import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../core/service/auth.service';
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
  paginator$!: Observable<Paginator>;
  articles!: Article[];
  paginator!: Paginator;
  currentPage = 1;

  constructor(private articlesApi: ArticlesApiService) {}

  ngOnInit(): void {
    this.paginator = {} as Paginator;
    this.getPage('1');
  }

  ngbPaginatorClicked(event: any) {
    this.getPage(event);
  }

  private getPage(page: string) {
    const params = { page };
    this.paginator$ = this.articlesApi.query(
      params
    ) as unknown as Observable<Paginator>;
    this.paginator$.subscribe((data) => {
      this.paginator = data;
      this.articles = this.paginator.data as Article[];
    });
  }
}
