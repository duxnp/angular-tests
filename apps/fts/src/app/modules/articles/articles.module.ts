import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesCreateComponent } from './pages/articles-create/articles-create.component';
import { ArticlesEditComponent } from './pages/articles-edit/articles-edit.component';
import { ArticlesIndexComponent } from './pages/articles-index/articles-index.component';
import { ArticlesShowComponent } from './pages/articles-show/articles-show.component';

@NgModule({
  declarations: [
    ArticlesIndexComponent,
    ArticlesCreateComponent,
    ArticlesShowComponent,
    ArticlesEditComponent,
  ],
  imports: [CommonModule, SharedModule, ArticlesRoutingModule],
})
export class ArticlesModule {}
