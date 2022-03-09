import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import {
  ConfirmService,
  ModalContent
} from '../../../../core/service/confirm.service';
import { ToastService } from '../../../../core/service/toast.service';
import { ArticlesApiService } from '../../../../data/service/articles-api.service';
import { Article } from '../../../../data/types/article';

@Component({
  selector: 'app-articles-edit',
  templateUrl: './articles-edit.component.html',
  styleUrls: ['./articles-edit.component.scss'],
})
export class ArticlesEditComponent implements OnInit, OnDestroy {
  article!: Article;
  confirmSubscription!: Subscription;
  subscriptions: Subscription[] = [];

  constructor(
    private articleApi: ArticlesApiService,
    private confirm: ConfirmService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.article = this.route.snapshot.data['article'] as Article;
  }

  ngOnDestroy(): void {
    this.confirmSubscription?.unsubscribe();
  }

  articleId(): number {
    const routeParams = this.route.snapshot.paramMap;
    const articleIdFromRoute = Number(routeParams.get('articleId'));
    return articleIdFromRoute;
  }

  onSubmit() {
    this.articleApi
      .update(this.articleId(), this.article)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/articles', this.articleId()]);
      });
  }

  onDelete() {
    const modalContent: ModalContent = { title: 'Awww yeah' };
    const modalRef = this.confirm.show(modalContent);

    // Confirm modal accepted
    this.subscriptions.push(
      modalRef.closed.subscribe((data: any) => {
        console.log(data);
        this.toastService.success('Deleting!');
        this.unsubscribe();
      })
    );

    // Confirm modal dismissed
    this.subscriptions.push(
      modalRef.dismissed.subscribe((data: any) => {
        console.log(data);
        this.toastService.danger('ABORT! ABORT!');
        this.unsubscribe();
      })
    );

    // this.articleApi.delete(this.articleId()).subscribe(
    //   data => {
    //     console.log(data);
    //     this.router.navigate(['/articles']);
    //   }
    // );
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }
}
