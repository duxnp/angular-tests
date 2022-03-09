import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { getModalConfig } from '../../shared/config/modal-defaults';
import { ModalContentComponent } from './modal-content/modal-content.component';

@Component({
  selector: 'nbt-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent {
  modalRef!: BsModalRef;
  bsModalRef!: BsModalRef;
  config = {
    animated: true,
  };

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalWithComponent() {
    const animated = true;
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...',
      ],
      title: 'Modal with component',
    };

    this.bsModalRef = this.modalService.show(ModalContentComponent, {
      animated,
      initialState,
      ...getModalConfig(),
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
