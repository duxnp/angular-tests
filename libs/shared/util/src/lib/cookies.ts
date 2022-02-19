/**
 * Angular doesn't have a built in cookie service because I think the recommendation is to use LocalStorage.
 *
 * I'm using this simple helper function instead of installing ngx-cookie-service because I need to support how Laravel and Angular handle CSRF protection. I'll only need to read a cookie value. I won't ever need to write cookies.
 *
 * @param name
 * @returns
 */
export function getCookie(name: string) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');

  return (parts.length === 2 && parts.pop()?.split(';').shift()) || '';
}

/**
 * Gets XSRF-TOKEN from cookies then decodes the encoded string. This value is used for the X-XSRF-TOKEN request header.
 *
 * @returns
 */
export function getXsrfToken() {
  return decodeURIComponent(getCookie('XSRF-TOKEN'));
}
