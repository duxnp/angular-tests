import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedayCardComponent } from './beday-card.component';

describe('BedayCardComponent', () => {
  let component: BedayCardComponent;
  let fixture: ComponentFixture<BedayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedayCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
