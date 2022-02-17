import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsTablesComponent } from './bs-tables.component';

describe('BsTablesComponent', () => {
  let component: BsTablesComponent;
  let fixture: ComponentFixture<BsTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
