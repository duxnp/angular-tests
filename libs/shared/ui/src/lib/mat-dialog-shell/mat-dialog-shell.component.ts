import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bry-mat-dialog-shell',
  templateUrl: './mat-dialog-shell.component.html',
  styleUrls: ['./mat-dialog-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatDialogShellComponent {
  @Input() title = '';
}

@NgModule({
  imports: [CommonModule],
  declarations: [MatDialogShellComponent],
  exports: [MatDialogShellComponent],
})
export class MatDialogShellModule {}
