import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsButtonsComponent } from './bs-buttons.component';

describe('BsButtonsComponent', () => {
  let component: BsButtonsComponent;
  let fixture: ComponentFixture<BsButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
