import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsTypographyComponent } from './bs-typography.component';

describe('BsTypographyComponent', () => {
  let component: BsTypographyComponent;
  let fixture: ComponentFixture<BsTypographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsTypographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
