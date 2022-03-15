import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogShellComponent } from './mat-dialog-shell.component';

describe('MatDialogShellComponent', () => {
  let component: MatDialogShellComponent;
  let fixture: ComponentFixture<MatDialogShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatDialogShellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDialogShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });
});
