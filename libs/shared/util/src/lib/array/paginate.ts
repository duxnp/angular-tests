/**
 * Gets a page from an array
 *
 * @param array
 * @param page
 * @param size
 * @returns
 */
export function getPage<T>(array: T[], page: number, size = 2): T[] {
  // human-readable page numbers usually start with 1,
  // so we reduce 1 in the first argument
  return array.slice((page - 1) * size, page * size);
}

/**
 * Turns an array into an array of arrays of the original type
 *
 * @param array
 * @param size
 * @returns
 */
export function paginate<T>(array: T[], size = 2) {
  return array.reduce((accumulator: T[][], value, i) => {
    const index = Math.floor(i / size);
    const page = accumulator[index] || (accumulator[index] = []);
    page.push(value);

    return accumulator;
  }, []);
}
