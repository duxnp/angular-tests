import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfiniteScrollTestComponent } from './infinite-scroll-test.component';

describe('InfiniteScrollTestComponent', () => {
  let component: InfiniteScrollTestComponent;
  let fixture: ComponentFixture<InfiniteScrollTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteScrollTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
