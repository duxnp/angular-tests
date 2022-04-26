import { screen } from '@testing-library/dom';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  MockRenderFactory,
  ngMocks
} from 'ng-mocks';

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
    factory.configureTestBed();
  });

  it('initializes', () => {
    const fixture = factory();
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  it('displays title input', () => {
    const fixture = factory({ title: 'Input Title' });
    const title = ngMocks.find('h1[mat-dialog-title]').nativeNode;

    expect(title).toHaveTextContent('Input Title');
    fixture.componentInstance.title = '@Input() change';
    fixture.detectChanges();
    expect(title).toHaveTextContent('@Input() change');
  });

  it('displays projected content', () => {
    expect(ngMocks.find('h1[mat-dialog-title]').nativeNode).toHaveTextContent(
      'Projected Title'
    );
    expect(
      ngMocks.find('div[mat-dialog-content]').nativeNode
    ).toHaveTextContent('Projected Body');
  });
});
