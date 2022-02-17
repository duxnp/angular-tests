import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormTestComponent } from './template-form-test.component';

describe('TemplateFormTestComponent', () => {
  let component: TemplateFormTestComponent;
  let fixture: ComponentFixture<TemplateFormTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFormTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
