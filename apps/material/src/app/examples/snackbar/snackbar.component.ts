import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    const snackBar = this._snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
    });

    snackBar.afterDismissed().subscribe(() => {
      console.log('AFTER DISMISS!');
    });

    snackBar.onAction().subscribe(() => {
      console.log('AFTER ACTION!');
    });
  }
}
