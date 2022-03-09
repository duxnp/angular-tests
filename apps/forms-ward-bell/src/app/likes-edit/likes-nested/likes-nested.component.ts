import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { NgModelGroup } from '@angular/forms';

import { formViewProvider } from '../../form-view-provider';
import { Like } from '../../model';

@Component({
  selector: 'app-likes-nested-form',
  templateUrl: './likes-nested.component.html',
  viewProviders: [formViewProvider],
})
export class LikesNestedFormComponent {
  @Input() likes: Like[] = [];
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter<Like>();
  @ViewChild('likes') grp!: NgModelGroup;
}
