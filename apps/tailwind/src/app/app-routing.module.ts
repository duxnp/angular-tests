import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { WorkcationComponent } from './workcation/workcation.component';
import { PropertiesComponent } from './properties/properties.component';


const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    pathMatch: 'full',
  },
  {
    path: 'workcation',
    component: WorkcationComponent
  },
  {
    path: 'properties',
    component: PropertiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
