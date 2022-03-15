import { Pipe, PipeTransform } from '@angular/core';

/**
 * https://stackoverflow.com/a/56701741/4187153
 * @param options
 * @param mockReturn
 * @returns
 */
export function mockPipe(options: Pipe, mockReturn: any): Pipe {
  const metadata: Pipe = { name: options.name };
  return <any>Pipe(metadata)(
    class MockPipe implements PipeTransform {
      public transform = () => mockReturn;
    }
  );
}
