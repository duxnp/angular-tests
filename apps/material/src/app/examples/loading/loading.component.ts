import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { concat, interval } from 'rxjs';
import { map, takeWhile, take, tap, ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  animations: [
    trigger('fadeOut', [
      state('in', style({ opacity: 1 })),
      transition('* => void', [
        animate(
          `.5s ease-out`,
          style({
            opacity: 0
          })
        )
      ])
    ])
  ],
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public loadingPercent = 0;
  public currentPlayback = 0;
  public queryValue = 0;
  public queryMode = 'query';

  constructor() { }

  ngOnInit() {
    this.loadingProgress(500)
      .subscribe(i => (this.loadingPercent = i));

    this.loadingProgress(250)
      .subscribe(i => (this.currentPlayback = i));

    concat(
      interval(2000).pipe(
        take(1),
        tap(_ => (this.queryMode = 'determinate')),
        ignoreElements()
      ),
      this.loadingProgress(500)
    ).subscribe(i => (this.queryValue = i));
  }

  loadingProgress(speed: number) {
    return interval(speed)
      .pipe(
        map(i => i * 10),
        takeWhile(i => i <= 100)
      );
  }
}
