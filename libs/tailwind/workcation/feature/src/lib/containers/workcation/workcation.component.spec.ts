import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkcationComponent } from './workcation.component';

describe('WorkcationComponent', () => {
  let component: WorkcationComponent;
  let fixture: ComponentFixture<WorkcationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkcationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkcationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
