import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeferLoadTestComponent } from './pages/defer-load-test/defer-load-test.component';
import { InfiniteScrollTestComponent } from './pages/infinite-scroll-test/infinite-scroll-test.component';
import { InjectTestComponent } from './pages/inject-test/inject-test.component';
import { TemplateFormTestComponent } from './pages/template-form-test/template-form-test.component';

const routes: Routes = [
  { path: 'infinite-scroll', component: InfiniteScrollTestComponent },
  { path: 'defer-load', component: DeferLoadTestComponent },
  { path: 'template-form', component: TemplateFormTestComponent },
  { path: 'inject', component: InjectTestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConceptTestsRoutingModule {}
