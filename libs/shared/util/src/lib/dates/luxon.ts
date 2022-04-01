import { DateTime } from 'luxon';

/**
 * The range of year values luxon supports.
 * It starts at -271820 and stops working halfway through 275760
 */
export const LuxonLimits = {
  YEAR_MIN: -271820,
  YEAR_MAX: 275759,
} as const;

/**
 * Moment weekday numbers go from 0 to 6 with 0 being Sunday.
 * Luxon weekday numbers go from 1 to 7 with 7 being Sunday.
 *
 * - Moment: 0 1 2 3 4 5 6
 * -  Luxon: 7 1 2 3 4 5 6
 *
 * @param calendar
 * @returns
 */
export function normalizeWeekday(calendar: DateTime) {
  return calendar.weekday === 7 ? 1 : calendar.weekday + 1;
}
