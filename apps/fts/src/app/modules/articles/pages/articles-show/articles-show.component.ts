import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../../../../data/types/article';

@Component({
  selector: 'app-articles-show',
  templateUrl: './articles-show.component.html',
  styleUrls: ['./articles-show.component.scss'],
})
export class ArticlesShowComponent implements OnInit {
  article!: Article;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.article = this.route.snapshot.data['article'] as Article;
  }
}
