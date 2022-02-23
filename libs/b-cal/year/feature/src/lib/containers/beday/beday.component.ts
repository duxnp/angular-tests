import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { BedayModalComponent } from '../../components/beday-modal/beday-modal.component';

@Component({
  selector: 'bc-beday',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BedayComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dialog
      .open(BedayModalComponent)
      .afterClosed()
      .subscribe(() =>
        this.router.navigate(['../'], { relativeTo: this.route })
      );
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [BedayComponent],
  exports: [BedayComponent],
})
export class BedayModule {}
