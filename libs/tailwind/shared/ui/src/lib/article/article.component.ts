import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tw-article',
  templateUrl: './article.component.html',
  styles: [],
})
export class ArticleComponent {}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ArticleComponent],
  exports: [ArticleComponent],
})
export class ArticleModule {}
