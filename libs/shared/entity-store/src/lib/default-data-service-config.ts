import { DefaultDataServiceConfig } from '@ngrx/data';

// The URL begins with '//' instead of 'http://' to trick Angular into thinking it's a relative path
// so it will add the X-XSRF-TOKEN header to requests
export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: `//fubar.edu/api`,
  timeout: 3 * 1000, // request timeout
};
