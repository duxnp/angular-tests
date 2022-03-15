/* https://blog.angularindepth.com/a-modern-solution-to-lazy-loading-using-intersection-observer-9280c149bbc */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';

// selector would be <appDeferLoad> if you wanted it to be an element directive
@Directive({
  selector: '[appDeferLoad]',
})
export class DeferLoadDirective implements AfterViewInit, OnDestroy {
  @Output() public appDeferLoad: EventEmitter<any> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;

  constructor(private element: ElementRef) {
    console.log('defer load');
  }

  public ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.checkForIntersection(entries);
    }, {});
    this.intersectionObserver.observe(this.element.nativeElement as Element);
  }

  public ngOnDestroy() {
    this.removeListeners();
  }

  private checkForIntersection = (
    entries: Array<IntersectionObserverEntry>
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.appDeferLoad.emit();
        this.intersectionObserver?.unobserve(
          this.element.nativeElement as Element
        );
        this.intersectionObserver?.disconnect();
      }
    });
  };

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    return (
      (entry as any).isIntersecting &&
      entry.target === this.element.nativeElement
    );
  }

  private removeListeners() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
