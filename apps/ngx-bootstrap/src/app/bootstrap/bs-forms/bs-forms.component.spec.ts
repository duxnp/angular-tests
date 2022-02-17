import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsFormsComponent } from './bs-forms.component';

describe('BsFormsComponent', () => {
  let component: BsFormsComponent;
  let fixture: ComponentFixture<BsFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
