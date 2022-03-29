import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logout-prompt',
  templateUrl: './logout-prompt.component.html',
  styleUrls: ['./logout-prompt.component.scss'],
})
export class LogoutPromptComponent {
  constructor(public activeModal: NgbActiveModal) {}

  onClosed(result: boolean) {
    this.activeModal.close(result);
  }
}
