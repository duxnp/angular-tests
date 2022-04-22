import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearNavMenuComponent } from './year-nav-menu.component';

describe('YearNavMenuComponent', () => {
  let component: YearNavMenuComponent;
  let fixture: ComponentFixture<YearNavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearNavMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
