import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';

import { Property } from '../models/Property';
import { PropertyCardComponent } from './property-card.component';

describe('PropertyComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;
  let property: Property;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PropertyCardComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
    property = {
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      imageAlt: 'Rear view of modern home with pool',
      beds: 3,
      baths: 2,
      title: 'Modern executive home in the heart of historic Los Angeles',
      priceInCents: 190000,
      formattedPrice: '$1,900.00',
      reviewCount: 34,
      rating: 4,
    };
    component.property = property;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
