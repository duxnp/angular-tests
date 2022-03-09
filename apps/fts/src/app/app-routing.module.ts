import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeferLoadTestComponent } from './modules/concept-tests/pages/defer-load-test/defer-load-test.component';
import { InfiniteScrollTestComponent } from './modules/concept-tests/pages/infinite-scroll-test/infinite-scroll-test.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'concept-tests',
    loadChildren: () =>
      import('./modules/concept-tests/concept-tests.module').then(
        (m) => m.ConceptTestsModule
      ),
  },
  {
    path: 'lazy',
    loadChildren: () =>
      import('./modules/lazy-hmr/lazy-hmr.module').then((m) => m.LazyHmrModule),
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./modules/articles/articles.module').then(
        (m) => m.ArticlesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
