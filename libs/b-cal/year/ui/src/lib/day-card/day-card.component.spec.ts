import { mockPipe } from '@angular-tests/shared/test-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayCardComponent } from './day-card.component';

describe('DayCardComponent', () => {
  let component: DayCardComponent;
  let fixture: ComponentFixture<DayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayCardComponent, mockPipe({ name: 'day' }, 'foo')],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCardComponent);
    component = fixture.componentInstance;
    const mockDay = {
      dayOfWeek: 1,
      dayOfYear: 1,
      isWeekend: false,
      beday: { id: 1, abbreviation: 'foo', name: 'foo' },
    };
    component.day = mockDay;
    component.today = mockDay;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
