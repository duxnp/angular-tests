import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SettingsService {
  public $appTheme = new BehaviorSubject<string>('default-theme');
  public themeChoices = [
    { value: 'default-theme', label: 'Default' },
    { value: 'light-theme', label: 'Light' },
    { value: 'black-theme', label: 'Black' },
  ];
}
