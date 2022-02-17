import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNavbarsComponent } from './bs-navbars.component';

describe('BsNavbarsComponent', () => {
  let component: BsNavbarsComponent;
  let fixture: ComponentFixture<BsNavbarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavbarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
