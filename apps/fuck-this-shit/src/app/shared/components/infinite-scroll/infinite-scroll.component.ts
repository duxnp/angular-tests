/* https://netbasal.com/build-an-infinite-scroll-component-in-angular-a9c16907a94d */

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', { static: true }) anchor!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;

  constructor(private host: ElementRef) {
    console.log('infinite scroll');
  }

  get element() {
    return this.host.nativeElement;
  }

  ngOnInit() {
    // The root option specifies what the observer is watching to determine intersection
    // If root is null, it watches the browser viewport
    // If root is some other element, it watches that specific element instead
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      console.log(entry);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return (
      style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll'
    );
  }
}
