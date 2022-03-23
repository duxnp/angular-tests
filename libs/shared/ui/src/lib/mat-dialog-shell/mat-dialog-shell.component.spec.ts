import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import {
  MatDialogShellComponent,
  MatDialogShellModule
} from './mat-dialog-shell.component';

describe('MatDialogShellComponent', () => {
  let spectator: SpectatorHost<MatDialogShellComponent>;

  const createHost = createHostFactory({
    component: MatDialogShellComponent,
    imports: [MatDialogShellModule],
    declareComponent: false,
  });

  beforeEach(() => {
    spectator = createHost(
      `<bry-mat-dialog-shell [title]="title">
        <div title>Projected Title</div>
        <div>Projected Body</div>
      </bry-mat-dialog-shell>`,
      { hostProps: { title: 'Input Title' } }
    );
  });

  it('initializes', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('displays title input', () => {
    const h1 = spectator.query('h1[mat-dialog-title]');
    expect(h1).toContainText('Input Title');
  });

  it('displays projected content', () => {
    const h1 = spectator.query('h1[mat-dialog-title]');
    expect(h1).toContainText('Projected Title');

    const content = spectator.query('div[mat-dialog-content]');
    expect(content).toContainText('Projected Body');
  });
});
