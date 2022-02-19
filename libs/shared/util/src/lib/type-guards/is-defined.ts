/**
 * Type Guard to be used with Array.filter();.
 * Typescript will understand that the result will not contain any undefined values.
 *
 * Usage: Array.filter(isDefined);
 *
 * Explanation: https://stackoverflow.com/a/54318054
 *
 * @template T
 * @param argument
 * @returns defined
 */
export function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}
