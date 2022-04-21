import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedayComponent } from './beday.component';

describe('BedayComponent', () => {
  let component: BedayComponent;
  let fixture: ComponentFixture<BedayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
