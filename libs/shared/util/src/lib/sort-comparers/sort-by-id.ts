/**
 * Sort comparer used by @ngrx/data.
 *
 * The sort algorithm compares adjacent array elements.
 *
 * @param a
 * @param b
 * @returns by id
 */
export function sortById(a: { id: number }, b: { id: number }): number {
  if (a.id < b.id) {
    return -1;
  }

  if (a.id > b.id) {
    return 1;
  }

  return 0;
}

export function sortByIdDesc(a: { id: number }, b: { id: number }): number {
  if (a.id < b.id) {
    return 1;
  }

  if (a.id > b.id) {
    return -1;
  }

  return 0;
}
