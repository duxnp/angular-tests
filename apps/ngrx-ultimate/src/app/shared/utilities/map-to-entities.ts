import { Entity } from '../../products/models/entity.model';

// First try using "any"
export const mapToEntitiesNonTyped = (
  array: Entity[],
  initialValue: { [id: number]: Entity }
) => {
  return array.reduce(
    // Reducer function
    // Arguments: (accumulator, currentValue)
    (entities: { [id: number]: Entity }, currentValue: any) => {
      return {
        ...entities,
        [currentValue.id]: currentValue,
      };
    },
    // Current
    {
      ...initialValue,
    }
  );
};

// The real Typescript way
export function mapToEntities<Type extends Entity>(
  array: Type[],
  initialValue: { [id: number]: Type }
): { [id: number]: Type } {
  return array.reduce(
    // Reducer callback
    // Arguments: (accumulator, currentValue)
    (entities: { [id: number]: Type }, currentValue: Type) => {
      return {
        ...entities,
        [currentValue.id]: currentValue,
      };
    },
    // Initial value
    {
      ...initialValue,
    }
  );
}
