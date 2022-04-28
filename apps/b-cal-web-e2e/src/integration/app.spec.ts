import { App } from '../pages/app.po';

describe('beday app', () => {
  let page: App;

  beforeEach(() => {
    page = new App();
    page.visit();
  });

  it('displays correct title', () => {
    cy.title().should('eq', 'Beluvian Calendar');
  });

  it('opens theme picker menu', () => {
    page.themePickerMenu().should('not.exist');
    page.themePickerButton().click();
    page.themePickerMenu().should('exist');
  });

  it('selects a theme', () => {
    page.themeStylesheet().should('not.exist');

    page.themePickerButton().click();
    page.selectTheme('deeppurple-amber').click();
    page.themeStylesheet().should('have.attr', 'href', 'deeppurple-amber.css');

    page.themePickerButton().click();
    page.selectTheme('purple-green').click();
    page.themeStylesheet().should('have.attr', 'href', 'purple-green.css');
  });
});
