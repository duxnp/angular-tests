import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircle,
  faCircleDot,
  faFillDrip,
  faWindowMinimize
} from '@fortawesome/free-solid-svg-icons';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {
  SiteTheme,
  ThemeStorage
} from '@ng-tests/shared/styles/theme-picker/data-access';
import { StyleManager } from '@ng-tests/shared/styles/theme-picker/util';

@Component({
  selector: 'bry-bs-theme-picker',
  templateUrl: 'bs-theme-picker.html',
  styleUrls: ['bs-theme-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: false, autoClose: true },
    },
  ],
})
export class BsThemePickerComponent {
  currentTheme: SiteTheme | undefined;

  menuIcon = faFillDrip;
  unselected = faCircle;
  selected = faCircleDot;
  underline = faWindowMinimize;

  // The below colors need to align with the themes defined in theme-picker.scss
  // TODO: polish up the bootstrap theme picking
  themes: SiteTheme[] = [
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      displayName: 'Flatly',
      name: 'flatly',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      displayName: 'Darkly',
      name: 'darkly',
      isDark: true,
    },
  ];

  constructor(
    public styleManager: StyleManager,
    private _themeStorage: ThemeStorage,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'theme-example',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/theme-demo-icon.svg')
    );
    const themeName = this._themeStorage.getStoredThemeName();
    if (themeName) {
      this.selectTheme(themeName);
    } else {
      this.themes.find((themes) => {
        if (themes.isDefault === true) {
          this.selectTheme(themes.name);
        }
      });
    }
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    );

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `${theme.name}.css`);
    }

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }
}

@NgModule({
  imports: [CommonModule, BsDropdownModule, FontAwesomeModule],
  exports: [BsThemePickerComponent],
  declarations: [BsThemePickerComponent],
  providers: [StyleManager, ThemeStorage],
})
export class BsThemePickerModule {}
