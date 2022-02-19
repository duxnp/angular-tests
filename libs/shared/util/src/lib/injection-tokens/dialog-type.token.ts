/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionToken } from '@angular/core';
import { ComponentType } from '@hmi-doors/shared/domain';

export const CONFIRM_DIALOG_TYPE = new InjectionToken<ComponentType<any>>(
  'hmi.confirm-dialog'
);

export const LOGOUT_DIALOG_TYPE = new InjectionToken<ComponentType<any>>(
  'hmi.logout-dialog'
);
