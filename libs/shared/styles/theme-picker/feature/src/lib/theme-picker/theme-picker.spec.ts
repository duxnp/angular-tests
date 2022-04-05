import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ThemePickerComponent, ThemePickerModule } from './theme-picker';

@NgModule({
  imports: [RouterTestingModule, HttpClientTestingModule],
  exports: [RouterTestingModule],
})
export class DocsAppTestingModule {}

describe('ThemePicker', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ThemePickerModule, DocsAppTestingModule],
      }).compileComponents();
    })
  );

  it('installs theme based on name', () => {
    const fixture = TestBed.createComponent(ThemePickerComponent);
    const component = fixture.componentInstance;
    const name = 'pink-bluegrey';
    jest.spyOn(component.styleManager, 'setStyle');
    component.selectTheme(name);
    expect(component.styleManager.setStyle).toHaveBeenCalled();
    expect(component.styleManager.setStyle).toHaveBeenCalledWith(
      'theme',
      `${name}.css`
    );
  });
});
