import { DateTime } from 'luxon';

import { Year } from '../pages/year.page';

describe('year feature', () => {
  const luxon = DateTime.now();

  let page: Year;

  beforeEach(() => {
    page = new Year();
    page.visit();
  });

  it('redirects to current year', () => {
    cy.url().should('include', '/' + luxon.year);
    // cy.screenshot();
  });

  it('displays year title', () => {
    page.yearTitle().contains(luxon.year);
  });

  it('displays day cards', () => {
    const days = luxon.daysInYear;
    page.dayCards().should((t) => expect(t.length).equal(days));
  });

  it('navigates to next year', () => {
    page.nextButton().click();
    cy.url().should('include', '/' + (luxon.year + 1));
  });

  it('navigates to previous year', () => {
    page.prevButton().click();
    cy.url().should('include', '/' + (luxon.year - 1));
  });

  it('displays day name for large screens', () => {
    page.dayOrdinal().should('not.be.visible');
    page.dayAbbr().should('not.be.visible');
    page.dayName().should('be.visible');
  });

  it('displays day abbr for medium screens', () => {
    cy.viewport('ipad-mini');
    page.dayOrdinal().should('not.be.visible');
    page.dayAbbr().should('be.visible');
    page.dayName().should('not.be.visible');
  });

  it('displays day ordinal for small screens', () => {
    cy.viewport('iphone-8');
    page.dayOrdinal().should('be.visible');
    page.dayAbbr().should('not.be.visible');
    page.dayName().should('not.be.visible');
  });
});
