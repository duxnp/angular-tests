import { App } from '../pages/app.po';

describe('b-cal-mobile', () => {
  let page: App;

  beforeEach(() => {
    page = new App();
    page.visit();
  });

  it('displays correct title', () => {
    cy.title().should('eq', 'Beluvian Calendar');
  });
});
