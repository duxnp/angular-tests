import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  @Input() title = '';
  @Input() body = '';
  @Input() confirmText = 'Yes';
  @Input() cancelText = 'No';
  @Output() closed: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  confirm() {
    this.closed.emit(true);
  }

  cancel() {
    this.closed.emit(false);
  }
}
