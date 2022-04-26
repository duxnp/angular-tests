import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';

/** Using example from https://github.com/ionic-team/ionic-unit-testing-example/blob/master/src/app/app.component.spec.ts */
describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();
    })
  );

  it('creates the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
