/* eslint-disable @typescript-eslint/no-explicit-any */
/** Interface that can be used to generically type a class. */
export interface ComponentType<T> {
  new (...args: any[]): T;
}
