import { Component } from '@angular/core';

import { routerTransition } from '../../core';

@Component({
  selector: 'anms-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routerTransition],
})
export class ExamplesComponent {
  examples = [{ link: 'material', label: 'Material Components' }];
}
