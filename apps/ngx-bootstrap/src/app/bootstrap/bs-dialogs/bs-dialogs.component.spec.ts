import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsDialogsComponent } from './bs-dialogs.component';

describe('BsDialogsComponent', () => {
  let component: BsDialogsComponent;
  let fixture: ComponentFixture<BsDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
