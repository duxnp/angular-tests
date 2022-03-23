import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks
} from 'ng-mocks';
import { of } from 'rxjs';

import { BedayModalComponent } from '../../components/beday-modal/beday-modal.component';
import { BedayComponent, BedayModule } from './beday.component';

/** https://medium.com/@aleixsuau/testing-angular-components-with-material-dialog-mddialog-1ae658b4e4b3 */
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(null),
    };
  }
}

describe('BedayComponent', () => {
  ngMocks.faster();

  let component: BedayComponent;
  let dialog: MatDialog;
  let dialogSpy: jest.SpyInstance;
  let fixture: MockedComponentFixture<BedayComponent>;
  let router: Router;
  let routerSpy: jest.SpyInstance;

  beforeAll(() =>
    MockBuilder(BedayComponent, BedayModule)
      .mock(BedayModalComponent)
      .keep(RouterTestingModule.withRoutes([]))
      .provide({ provide: MatDialog, useClass: MatDialogMock })
  );

  beforeAll(() => {
    // Prevent detect changes because the spy must be created before the first change detection
    fixture = MockRender(BedayComponent, null, {
      detectChanges: false,
    });

    component = fixture.point.componentInstance;
    dialog = fixture.point.injector.get(MatDialog);
    dialogSpy = jest.spyOn(dialog, 'open');
    router = fixture.point.injector.get(Router);
    routerSpy = jest.spyOn(router, 'navigate').mockImplementation();
  });

  beforeEach(() => {
    routerSpy.mockClear();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('opens dialog and routes to previous page on close', () => {
    fixture.detectChanges();
    expect(dialogSpy).toBeCalled();
    expect(routerSpy).toBeCalledTimes(1);
  });
});
