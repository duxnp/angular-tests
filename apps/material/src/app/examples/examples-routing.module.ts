import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatatableComponent } from './datatable/datatable.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ExamplesComponent } from './examples/examples.component';
import { IconsComponent } from './icons/icons.component';
import { InputsComponent } from './inputs/inputs.component';
import { LoadingComponent } from './loading/loading.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { ToolbarsComponent } from './toolbars/toolbars.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'sidenav',
        pathMatch: 'full'
      },
      {
        path: 'sidenav',
        component: SidenavComponent,
        data: {
          title: 'Sidenav'
        }
      },
      {
        path: 'toolbars',
        component: ToolbarsComponent,
        data: {
          title: 'Toolbars'
        }
      },
      {
        path: 'icons',
        component: IconsComponent,
        data: {
          title: 'Icons'
        }
      },
      {
        path: 'inputs',
        component: InputsComponent,
        data: {
          title: 'Inputs'
        }
      },
      {
        path: 'loading',
        component: LoadingComponent,
        data: {
          title: 'Loading'
        }
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },
      {
        path: 'datepicker',
        component: DatepickerComponent,
        data: {
          title: 'Datepicker'
        }
      },
      {
        path: 'snackbar',
        component: SnackbarComponent,
        data: {
          title: 'Snackbar'
        }
      },
      {
        path: 'datatable',
        component: DatatableComponent,
        data: {
          title: 'Datatable'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
