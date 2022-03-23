import { BedaysEntity } from '../bedays.models';

export function getBedaysMock(): BedaysEntity {
  return { id: 1, name: 'foo', abbreviation: 'foo' };
}
