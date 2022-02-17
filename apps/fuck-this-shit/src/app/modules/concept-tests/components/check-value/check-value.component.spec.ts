import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckValueComponent } from './check-value.component';

describe('CheckValueComponent', () => {
  let component: CheckValueComponent;
  let fixture: ComponentFixture<CheckValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
