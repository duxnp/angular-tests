import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Destination } from '../models/Destination';

@Component({
  selector: 'tw-city-card',
  templateUrl: './city-card.component.html',
})
export class CityCardComponent {
  // If the container of the component template would normally need some classes applied...
  @HostBinding('class') class = 'mt-6 w-full px-4 lg:w-1/2 xl:w-1/3';

  @Input() destination!: Destination;
}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CityCardComponent],
  exports: [CityCardComponent],
})
export class CityCardModule {}
