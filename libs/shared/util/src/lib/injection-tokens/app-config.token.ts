import { InjectionToken, ValueProvider } from '@angular/core';
import { AppConfig } from '@angular-tests/shared/domain';

export const APP_CONFIG = new InjectionToken<AppConfig>('hmi.config');

export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: value,
});
