import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectTestComponent } from './inject-test.component';

describe('InjectTestComponent', () => {
  let component: InjectTestComponent;
  let fixture: ComponentFixture<InjectTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InjectTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
