import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { BedayModalComponent } from './beday-modal.component';

describe('BedayModalComponent', () => {
  let component: BedayModalComponent;
  let fixture: ComponentFixture<BedayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedayModalComponent],
      providers: [
        provideMockStore({
          selectors: [],
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });
});
