import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccordionComponent } from './accordion/accordion.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CollapseComponent } from './collapse/collapse.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { ModalsComponent } from './modals/modals.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PopoverComponent } from './popover/popover.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { RatingComponent } from './rating/rating.component';
import { SortableComponent } from './sortable/sortable.component';
import { TabsComponent } from './tabs/tabs.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accordion',
    pathMatch: 'full'
  },
  {
    path: 'accordion',
    component: AccordionComponent,
  },
  {
    path: 'alerts',
    component: AlertsComponent,
  },
  {
    path: 'buttons',
    component: ButtonsComponent,
  },
  {
    path: 'carousel',
    component: CarouselComponent,
  },
  {
    path: 'collapse',
    component: CollapseComponent,
  },
  {
    path: 'datepicker',
    component: DatepickerComponent,
  },
  {
    path: 'dropdowns',
    component: DropdownsComponent,
  },
  {
    path: 'modals',
    component: ModalsComponent,
  },
  {
    path: 'pagination',
    component: PaginationComponent,
  },
  {
    path: 'popover',
    component: PopoverComponent,
  },
  {
    path: 'progressbar',
    component: ProgressbarComponent,
  },
  {
    path: 'rating',
    component: RatingComponent,
  },
  {
    path: 'sortable',
    component: SortableComponent,
  },
  {
    path: 'tabs',
    component: TabsComponent,
  },
  {
    path: 'timepicker',
    component: TimepickerComponent,
  },
  {
    path: 'tooltip',
    component: TooltipComponent,
  },
  {
    path: 'typeahead',
    component: TypeaheadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
