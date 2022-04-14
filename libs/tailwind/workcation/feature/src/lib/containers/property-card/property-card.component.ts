import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import { ButtonTestModule } from '@ng-tests/tailwind/shared/ui';

import { Property } from '../models/Property';

@Component({
  selector: 'tw-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
})
export class PropertyCardComponent {
  // Applies 'overflow-hidden' to the <tw-property-card> selector so 'truncate' will still work
  @HostBinding('class') class = 'overflow-hidden pb-5';

  @Input() property!: Property;

  star = faStar;

  // Using ngFor as a simple for loop
  // https://stackoverflow.com/a/36356629
}

@NgModule({
  imports: [CommonModule, FontAwesomeModule, ButtonTestModule],
  declarations: [PropertyCardComponent],
  exports: [PropertyCardComponent],
})
export class PropertyCardModule {}
