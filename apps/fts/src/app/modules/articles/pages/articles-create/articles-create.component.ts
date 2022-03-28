import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticlesApiService } from '../../../../data/service/articles-api.service';
import { Article } from '../../../../data/types/article';

@Component({
  selector: 'app-articles-create',
  templateUrl: './articles-create.component.html',
  styleUrls: ['./articles-create.component.scss'],
})
export class ArticlesCreateComponent implements OnInit {
  article!: Article;

  constructor(private articleApi: ArticlesApiService, private router: Router) {}

  ngOnInit(): void {
    this.article = {} as Article;
  }

  onSubmit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.articleApi.store(this.article).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/articles']);
    });
  }
}
