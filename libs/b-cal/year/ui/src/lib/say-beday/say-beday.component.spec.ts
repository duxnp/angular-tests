import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SayBedayComponent } from './say-beday.component';

describe('SayBedayComponent', () => {
  let component: SayBedayComponent;
  let fixture: ComponentFixture<SayBedayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SayBedayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SayBedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
