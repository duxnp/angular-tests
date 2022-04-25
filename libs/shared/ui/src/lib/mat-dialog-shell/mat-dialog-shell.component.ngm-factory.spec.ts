import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  MockRenderFactory,
  ngMocks
} from 'ng-mocks';

import { addCustomMatchers } from '@ng-tests/shared/test-utils';

import {
  MatDialogShellComponent,
  MatDialogShellModule
} from './mat-dialog-shell.component';

describe('MatDialogShellComponent:ng-mocks', () => {
  const factory = MockRenderFactory<MatDialogShellComponent>(
    `<bry-mat-dialog-shell [title]="title">
      <div title>Projected Title</div>
      <div>Projected Body</div>
    </bry-mat-dialog-shell>`,
    ['title']
  );

  ngMocks.faster();

  beforeAll(() => MockBuilder(MatDialogShellComponent, MatDialogShellModule));

  beforeAll(() => {
    addCustomMatchers();
    factory.configureTestBed();
  });

  it('initializes', () => {
    const fixture = factory();
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  it('displays title input', () => {
    const fixture = factory({ title: 'Input Title' });
    expect('h1[mat-dialog-title]').toContainText('Input Title');
    fixture.componentInstance.title = 'foo';
    fixture.detectChanges();
    expect('h1[mat-dialog-title]').toContainText('foo');
  });

  it('displays projected content', () => {
    expect('h1[mat-dialog-title]').toContainText('Projected Title');
    expect('div[mat-dialog-content]').toContainText('Projected Body');
  });
});
