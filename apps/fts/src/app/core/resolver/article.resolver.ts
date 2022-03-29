import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { ArticlesApiService } from '../../data/service/articles-api.service';
import { Article } from '../../data/types/article';

// import { ArticlesEditComponent } from '../../modules/articles/pages/articles-edit/articles-edit.component';
// import { ArticlesShowComponent } from '../../modules/articles/pages/articles-show/articles-show.component';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver implements Resolve<Article> {
  constructor(private articlesApi: ArticlesApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article> {
    // Example of changing the route config at run time
    // route.routeConfig.component = ArticlesEditComponent;
    const articleIdFromRoute = Number(route.paramMap.get('articleId'));
    return this.articlesApi.show(articleIdFromRoute);
  }
}
