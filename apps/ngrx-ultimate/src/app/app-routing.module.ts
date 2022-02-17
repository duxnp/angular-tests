import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'drinks',
    loadChildren: () =>
      import('./drinks/drinks.module').then((m) => m.DrinksModule),
  },
  {
    path: 'nrwl',
    loadChildren: () => import('./nrwl/nrwl.module').then((m) => m.NrwlModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
