import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { BsThemePickerComponent, BsThemePickerModule } from './bs-theme-picker';

@NgModule({
  imports: [RouterTestingModule, HttpClientTestingModule],
  exports: [RouterTestingModule],
})
export class DocsAppTestingModule {}

describe('ThemePicker', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          BsThemePickerModule,
          DocsAppTestingModule,
          NoopAnimationsModule,
        ],
      }).compileComponents();
    })
  );

  it('installs theme based on name', () => {
    const fixture = TestBed.createComponent(BsThemePickerComponent);
    const component = fixture.componentInstance;
    const name = 'darkly';
    jest.spyOn(component.styleManager, 'setStyle');
    component.selectTheme(name);
    expect(component.styleManager.setStyle).toHaveBeenCalled();
    expect(component.styleManager.setStyle).toHaveBeenCalledWith(
      'theme',
      `${name}.css`
    );
  });
});
