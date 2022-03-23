import { DebugElement } from '@angular/core';

/**
 * From angular.io
 * Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler
 * */
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 },
};

/**
 * From angular.io
 * Simulate element click. Defaults to mouse left-button click event.
 * */
export function clickEl(
  el: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
