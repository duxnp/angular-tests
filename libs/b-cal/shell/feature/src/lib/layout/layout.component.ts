import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import {
  StyleManager,
  ThemePickerModule,
  ThemeStorage
} from '@ng-tests/shared/material/theme-picker/feature';

@Component({
  selector: 'bc-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {}

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule,
    ThemePickerModule,
  ],
  declarations: [AppLayoutComponent],
  exports: [AppLayoutComponent],
  providers: [StyleManager, ThemeStorage],
})
export class AppLayoutModule {}
