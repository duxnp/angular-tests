import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {

  }

  openSnackBar(message: string) {
    const snackBar = this._snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'bottom'
    });

    snackBar.afterDismissed().subscribe(_ => {
      console.log('AFTER DISMISS!');
    });

    snackBar.onAction().subscribe(_ => {
      console.log('AFTER ACTION!');
    });
  }

}
