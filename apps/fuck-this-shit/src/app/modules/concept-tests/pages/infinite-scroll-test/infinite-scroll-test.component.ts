import { Component, OnInit } from '@angular/core';
import { randNumber, randUserName, randText } from '@ngneat/falso';
import { Tweet } from '../../../../data/types/tweet';

@Component({
  selector: 'app-infinite-scroll-test',
  templateUrl: './infinite-scroll-test.component.html',
  styleUrls: ['./infinite-scroll-test.component.scss'],
})
export class InfiniteScrollTestComponent implements OnInit {
  tweets: Tweet[];

  constructor() {
    this.tweets = [];
  }

  ngOnInit() {
    this.fetchTweets();
  }

  onScroll() {
    this.fetchTweets();
  }

  // TODO: for practice, make a Tweets service as if it were getting data from an API
  private fetchTweets() {
    for (let i = 0; i < 30; i++) {
      this.tweets.push({
        id: randNumber(),
        username: randUserName(),
        text: randText(),
      });
    }
  }
}
