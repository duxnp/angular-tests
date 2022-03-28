import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';

import { formViewProvider } from '../form-view-provider';
import { Like } from '../model';

@Component({
  selector: 'app-likes-group-form',
  templateUrl: './likes-group-form.component.html',
  viewProviders: [formViewProvider],
})
export class LikesGroupFormComponent implements AfterViewInit {
  @Input() likes: Like[];
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter<Like>();
  @ViewChild('likes') group: NgModelGroup;

  constructor(private form: NgForm) {}

  ngAfterViewInit() {
    // NG Quirk: Wait a tick in order to see the NgGroup control.
    setTimeout(() => {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const g = this.group;
      const f = this.form;
      /* eslint-disable */
    }, 1);
  }
}
