import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import { fromEvent } from 'rxjs/observable/fromEvent';

// export const SCROLL_CONTAINER = '.mat-drawer-content';
export const SCROLL_CONTAINER = 'html';
export const PRIMARY_TEXT_THRESHOLD = 22;
export const PRIMARY_SHADOW_THRESHOLD = 78;

@Component({
  selector: 'app-toolbars',
  templateUrl: './toolbars.component.html',
  styleUrls: ['./toolbars.component.scss'],
})
export class ToolbarsComponent implements OnInit, OnDestroy {
  public popText!: boolean;
  public applyShadow!: boolean;
  private _onDestroy = new Subject();

  // This isn't used in the egghead lesson. I was just trying this to troubleshoot.
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   // do some stuff here when the window is scrolled
  //    const verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //    console.log(verticalOffset);
  // }

  constructor() {}

  ngOnInit() {
    const container = document.querySelector(SCROLL_CONTAINER);

    // For some reason you can't target <html> tag with the scroll event
    // You have to attach it to the entire document
    fromEvent(document, 'scroll', { passive: true })
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        if (document.scrollingElement !== null) {
          this.determineHeader(document.scrollingElement.scrollTop);
        }
      });
  }

  determineHeader(top: number) {
    if (top >= PRIMARY_TEXT_THRESHOLD) {
      this.popText = true;
    } else {
      this.popText = false;
    }

    if (top >= PRIMARY_SHADOW_THRESHOLD) {
      this.applyShadow = true;
    } else {
      this.applyShadow = false;
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }
}
