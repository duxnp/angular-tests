import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeferLoadTestComponent } from './defer-load-test.component';

describe('DeferLoadTestComponent', () => {
  let component: DeferLoadTestComponent;
  let fixture: ComponentFixture<DeferLoadTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeferLoadTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeferLoadTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
