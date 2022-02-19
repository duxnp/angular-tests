/* eslint-disable @typescript-eslint/no-explicit-any */
// This creates a type that removes all methods from the supplied type
export type ExcludeMethods<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends (_: any) => any ? never : K }[keyof T]
>;

// Interface Transfer Object
// This lets you have a class that inherits the properties of an interface so you don't have to
// retype all the properties again.
export abstract class ITO<T> {
  public constructor(initializer: ExcludeMethods<T>) {
    Object.assign(this, initializer);
  }
}
