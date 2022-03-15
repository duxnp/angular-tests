import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbModalModule,
  NgbPaginationModule,
  NgbToastModule
} from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { LogoutPromptComponent } from './components/logout-prompt/logout-prompt.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { DeferLoadDirective } from './directives/defer-load/defer-load.directive';

@NgModule({
  imports: [
    // modules here
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // ModalModule.forRoot(),
    // PaginationModule.forRoot(),
    NgbPaginationModule,
    NgbModalModule,
    NgbToastModule,
  ],
  declarations: [
    // components here
    InfiniteScrollComponent,
    DeferLoadDirective,
    ConfirmModalComponent,
    ToastsComponent,
    LogoutPromptComponent,
    ModalContentComponent,
  ],
  exports: [
    // export everything here
    CommonModule,
    // HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // ModalModule,
    // PaginationModule,
    NgbPaginationModule,
    NgbModalModule,
    NgbToastModule,

    InfiniteScrollComponent,
    DeferLoadDirective,
    ToastsComponent,
  ],
})
export class SharedModule {}
