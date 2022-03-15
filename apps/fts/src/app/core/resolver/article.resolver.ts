import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { ArticlesApiService } from '../../data/service/articles-api.service';
import { ArticlesEditComponent } from '../../modules/articles/pages/articles-edit/articles-edit.component';
import { ArticlesShowComponent } from '../../modules/articles/pages/articles-show/articles-show.component';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver implements Resolve<any> {
  constructor(private articlesApi: ArticlesApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Example of changing the route config at run time
    // route.routeConfig.component = ArticlesEditComponent;
    const articleIdFromRoute = Number(route.paramMap.get('articleId'));
    return this.articlesApi.show(articleIdFromRoute);
  }
}
