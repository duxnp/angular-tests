import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

import { CityCardModule } from '../city-card/city-card.component';
import { Destination } from '../models/Destination';

@Component({
  selector: 'tw-workcation',
  templateUrl: './workcation.component.html',
  styles: [],
})
export class WorkcationComponent {
  popularDestinations: Destination[];

  constructor() {
    this.popularDestinations = [
      {
        city: 'Toronto',
        averagePrice: 120,
        propertyCount: 76,
        imageUrl: 'https://source.unsplash.com/qlKaN7eqay8/600x600',
        imageAlt: 'Toronto skyline',
      },
      {
        city: 'Malibu',
        averagePrice: 215,
        propertyCount: 43,
        imageUrl: 'https://source.unsplash.com/INHtWKpBTsA/600x600',
        imageAlt: 'Cliffs of Malibu',
      },
      {
        city: 'Chicago',
        averagePrice: 130,
        propertyCount: 76,
        imageUrl: 'https://source.unsplash.com/Nyvq2juw4_o/600x600',
        imageAlt: 'Chicago',
      },
      {
        city: 'Seattle',
        averagePrice: 135,
        propertyCount: 76,
        imageUrl: 'https://source.unsplash.com/insv5BSTqv0/600x600',
        imageAlt: 'Seattle',
      },
      {
        city: 'Denver',
        averagePrice: 85,
        propertyCount: 76,
        imageUrl: 'https://source.unsplash.com/xoYPV4oVQJI/600x600',
        imageAlt: 'Denver',
      },
      {
        city: 'Miami',
        averagePrice: 115,
        propertyCount: 76,
        imageUrl: 'https://source.unsplash.com/KTdzeb28jyo/600x600',
        imageAlt: 'Miami',
      },
    ];
  }
}

@NgModule({
  imports: [CommonModule, CityCardModule],
  declarations: [WorkcationComponent],
  exports: [WorkcationComponent],
})
export class WorkcationModule {}
