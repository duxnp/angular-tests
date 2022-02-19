import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

export const bCalCalendarFeatureRoutes: Route[] = [
  {
    path: '',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(bCalCalendarFeatureRoutes)],
})
export class BCalCalendarFeatureModule {}
