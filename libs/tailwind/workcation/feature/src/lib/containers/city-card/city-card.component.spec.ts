import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Destination } from '../models/Destination';
import { CityCardComponent } from './city-card.component';

describe('CityCardComponent', () => {
  let component: CityCardComponent;
  let fixture: ComponentFixture<CityCardComponent>;
  let destination: Destination;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CityCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCardComponent);
    component = fixture.componentInstance;

    destination = {
      city: 'Toronto',
      averagePrice: 120,
      propertyCount: 76,
      imageUrl: 'https://source.unsplash.com/qlKaN7eqay8/600x600',
      imageAlt: 'Toronto skyline',
    };
    component.destination = destination;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
