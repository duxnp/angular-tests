/**
 * Given an object that looks like a Plain Old Javascript Object,
 * returns an object with empty properties removed.
 *
 * Useful for if you don't want to send empty params in an HTTP request.
 *
 * Inspired by: https://stackoverflow.com/a/38340730
 */
export function removeEmpty(obj: Record<string, unknown>) {
  return Object.entries(obj)
    .filter(([, v]) => {
      if (typeof v === 'string') {
        return v.length > 0;
      }
      return v != null;
    })
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}
