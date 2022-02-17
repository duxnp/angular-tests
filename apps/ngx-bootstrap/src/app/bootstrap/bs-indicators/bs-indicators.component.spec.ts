import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsIndicatorsComponent } from './bs-indicators.component';

describe('BsIndicatorsComponent', () => {
  let component: BsIndicatorsComponent;
  let fixture: ComponentFixture<BsIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
