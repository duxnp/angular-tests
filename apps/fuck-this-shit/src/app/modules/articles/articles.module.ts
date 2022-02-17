import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesIndexComponent } from './pages/articles-index/articles-index.component';
import { ArticlesCreateComponent } from './pages/articles-create/articles-create.component';
import { ArticlesShowComponent } from './pages/articles-show/articles-show.component';
import { ArticlesEditComponent } from './pages/articles-edit/articles-edit.component';

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
