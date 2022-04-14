import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property';

@Component({
  selector: 'tw-properties',
  templateUrl: './properties.component.html',
  styles: []
})
export class PropertiesComponent implements OnInit {
  property: Property;

  constructor() {
    this.property = {
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      imageAlt: 'Rear view of modern home with pool',
      beds: 3,
      baths: 2,
      title: 'Modern executive home in the heart of historic Los Angeles',
      priceInCents: 190000,
      formattedPrice: '$1,900.00',
      reviewCount: 34,
      rating: 4
    }
  }

  ngOnInit() {
  }

}
