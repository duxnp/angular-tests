import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectorTwoComponent } from './injector-two.component';

describe('InjectorTwoComponent', () => {
  let component: InjectorTwoComponent;
  let fixture: ComponentFixture<InjectorTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InjectorTwoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectorTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
