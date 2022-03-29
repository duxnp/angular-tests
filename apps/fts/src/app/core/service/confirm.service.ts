import { Injectable } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

export interface ModalContent {
  title?: string;
  body?: string;
  confirmBtnText?: string;
  dismissBtnText?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  defaultOptions: NgbModalOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultState: any;
  defaultContent: ModalContent;
  modalRefClosed!: Subscription;
  modalRefDismissed!: Subscription;

  constructor(private modalService: NgbModal) {
    this.defaultOptions = {
      backdrop: 'static',
      keyboard: false,
    };

    this.defaultContent = {
      title: 'Proceed?',
      body: 'Perform this action?',
      confirmBtnText: 'OK',
      dismissBtnText: 'Cancel',
    };
  }

  show(content?: ModalContent): NgbModalRef {
    const modalContent: ModalContent = { ...this.defaultContent, ...content };
    const modalRef = this.modalService.open(
      ConfirmModalComponent,
      this.defaultOptions
    );
    modalRef.componentInstance.modalContent = modalContent;

    return modalRef;
  }
}
