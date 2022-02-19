/** Remove trailing spaces or slashes */
export function removeTrailingSlash(url: string) {
  return url.replace(/[/]+$/g, '');
}
