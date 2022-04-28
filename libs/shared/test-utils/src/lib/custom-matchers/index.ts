/**
 * Doing it like this caused Typescript to get confused with the matchers Cypress uses:
 * /// <reference types="jest" />
 * /// <reference path="./matchers-types.ts" />
 * */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toExist(): boolean;
      toHaveLength(expected: number): boolean;
      toHaveId(id: string | number): boolean;
      toHaveClass(
        className: string | string[],
        options?: { strict: boolean }
      ): boolean;
      toHaveAttribute(attr: string | object, val?: string): boolean;
      toHaveProperty(prop: string | object, val?: string | boolean): boolean;
      toContainProperty(prop: string | object, val?: string): boolean;
      toHaveText(
        text: string | string[] | ((text: string) => boolean),
        exact?: boolean
      ): boolean;
      toContainText(
        text: string | string[] | ((text: string) => boolean),
        exact?: boolean
      ): boolean;
      toHaveExactText(
        text: string | string[] | ((text: string) => boolean)
      ): boolean;
      toHaveValue(value: string | string[]): boolean;
      toContainValue(value: string | string[]): boolean;
      toHaveStyle(style: { [styleKey: string]: any }): boolean;
      toHaveData({ data, val }: { data: string; val: string }): boolean;
      toBeChecked(): boolean;
      toBeDisabled(): boolean;
      toBeEmpty(): boolean;
      toBePartial(partial: object): boolean;
      toBeHidden(): boolean;
      toBeSelected(): boolean;
      toBeVisible(): boolean;
      toBeFocused(): boolean;
      toBeMatchedBy(selector: string | Element): boolean;
      toHaveDescendant(selector: string | Element): boolean;
      toHaveDescendantWithText({
        selector,
        text,
      }: {
        selector: string;
        text: string;
      }): boolean;
      toHaveSelectedOptions(
        expected: string | string[] | HTMLOptionElement | HTMLOptionElement[]
      ): boolean;
    }
  }
}

import { addMatchers } from './core';
import * as customMatchers from './matchers';

/**
 * Custom matchers from https://github.com/ngneat/spectator
 *
 * I like the custom matchers included with spectator, but the MockBuilder from ng-mocks is often nicer to use
 * than createComponentFactory for setting up the test module.
 *
 * A lot of lint rules had to be disabled to get their code to work in this library.
 * Maybe some day I will try refactoring.
 *
 * Example usage:
 * ```ts
 * beforeAll(() => {
 *   addCustomMatchers();
 *   ...
 * });
 * ```
 * */
export function addCustomMatchers() {
  addMatchers(customMatchers);
}
