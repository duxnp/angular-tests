import { Component, Input } from '@angular/core';
import { ModalContent } from '../../../core/service/confirm.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() modalContent!: ModalContent;

  constructor(public activeModal: NgbActiveModal) {}
}
