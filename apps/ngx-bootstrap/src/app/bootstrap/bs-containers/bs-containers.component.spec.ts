import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsContainersComponent } from './bs-containers.component';

describe('BsContainersComponent', () => {
  let component: BsContainersComponent;
  let fixture: ComponentFixture<BsContainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsContainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
