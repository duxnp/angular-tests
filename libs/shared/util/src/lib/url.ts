import { Params } from '@angular/router';

export function getUrlQueryParams(): Params {
  let urlQueryParams = {};

  if (location.search) {
    const queryParams = new URLSearchParams(location.search);

    queryParams.forEach((value, key) => {
      urlQueryParams = { ...urlQueryParams, [key]: value };
    });
  }

  return urlQueryParams;
}

export function getUrlQueryParam(paramName: string): string {
  return getUrlQueryParams()[paramName];
}
