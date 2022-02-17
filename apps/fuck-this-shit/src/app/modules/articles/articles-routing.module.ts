import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesCreateComponent } from './pages/articles-create/articles-create.component';
import { ArticlesEditComponent } from './pages/articles-edit/articles-edit.component';
import { ArticlesIndexComponent } from './pages/articles-index/articles-index.component';
import { ArticlesShowComponent } from './pages/articles-show/articles-show.component';
import { ArticleResolver } from '../../core/resolver/article.resolver';

const routes: Routes = [
  { path: '', component: ArticlesIndexComponent },
  { path: 'create', component: ArticlesCreateComponent },
  {
    path: ':articleId',
    component: ArticlesShowComponent,
    resolve: { article: ArticleResolver },
  },
  {
    path: ':articleId/edit',
    component: ArticlesEditComponent,
    resolve: { article: ArticleResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
