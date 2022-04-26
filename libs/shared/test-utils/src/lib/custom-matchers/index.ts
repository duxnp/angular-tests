/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="jest" />
/// <reference path="./matchers-types.ts" />

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
