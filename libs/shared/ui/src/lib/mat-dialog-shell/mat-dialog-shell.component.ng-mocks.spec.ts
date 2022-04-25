import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { addCustomMatchers } from '@ng-tests/shared/test-utils';

import {
  MatDialogShellComponent,
  MatDialogShellModule
} from './mat-dialog-shell.component';

describe('MatDialogShellComponent:ng-mocks', () => {
  ngMocks.faster();

  let fixture: MockedComponentFixture<
    MatDialogShellComponent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string | number | symbol, any>
  >;

  beforeAll(() => MockBuilder(MatDialogShellComponent, MatDialogShellModule));

  beforeAll(() => {
    addCustomMatchers();
    fixture = MockRender<MatDialogShellComponent>(
      `<bry-mat-dialog-shell [title]="title">
        <div title>Projected Title</div>
        <div>Projected Body</div>
      </bry-mat-dialog-shell>`,
      { title: 'Input Title' }
    );
  });

  it('initializes', () => {
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  it('displays title input', () => {
    expect('h1[mat-dialog-title]').toContainText('Input Title');
  });

  it('displays projected content', () => {
    expect('h1[mat-dialog-title]').toContainText('Projected Title');
    expect('div[mat-dialog-content]').toContainText('Projected Body');
  });
});
