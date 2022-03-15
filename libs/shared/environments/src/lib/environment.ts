// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AppConfig } from '@ng-tests/shared/domain';

// The apiURL begins with '//' instead of 'http://' to trick Angular into thinking it's a relative path
// so it will add the X-XSRF-HEADER to requests.
// If the webpack proxy is configured, the apiURL can possibly be blank.
export const environment: AppConfig = {
  production: false,
  // apiURL: '//dev-oo.hmidomain.net',
  apiURL: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
