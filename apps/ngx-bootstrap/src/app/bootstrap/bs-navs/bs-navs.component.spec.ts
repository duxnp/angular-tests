import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNavsComponent } from './bs-navs.component';

describe('BsNavsComponent', () => {
  let component: BsNavsComponent;
  let fixture: ComponentFixture<BsNavsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
