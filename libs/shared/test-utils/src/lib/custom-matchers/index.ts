/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="jest" />
/// <reference path="./matchers-types.ts" />

import { addMatchers } from './core';
import * as customMatchers from './matchers';

export function addCustomMatchers() {
  addMatchers(customMatchers);
}
