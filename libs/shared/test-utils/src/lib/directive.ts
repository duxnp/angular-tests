import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Finds a single element inside the Component by the given CSS selector.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 * @param selector CSS selector
 *
 */
export function queryByDirective<T>(
  fixture: ComponentFixture<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: Type<any>
): DebugElement {
  const debugElement = fixture.debugElement.query(By.directive(type));

  // Fail on null so the return type is always DebugElement.
  if (!debugElement) {
    throw new Error(`queryByDirective: Directive not found`);
  }
  return debugElement;
}

export function queryAllByDirective<T>(
  fixture: ComponentFixture<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: Type<any>
): DebugElement[] {
  const debugElement = fixture.debugElement.queryAll(By.directive(type));

  // Fail on null so the return type is always DebugElement.
  if (!debugElement) {
    throw new Error(`queryByDirective: Directive not found`);
  }
  return debugElement;
}

export function findDirectiveComponent<T>(
  fixture: ComponentFixture<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: Type<any>
) {
  return queryByDirective(fixture, type).componentInstance;
}
