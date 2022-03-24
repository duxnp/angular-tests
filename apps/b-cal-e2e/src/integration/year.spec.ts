import { DateTime } from 'luxon';

import {
  getDayAbbr,
  getDayCards,
  getDayName,
  getDayOrdinal,
  getNextButton,
  getPrevButton,
  getYearSpan
} from '../support/app.po';

describe('year feature', () => {
  const luxon = DateTime.now();

  beforeEach(() => cy.visit('/'));

  it('redirects to current year', () => {
    cy.url().should('include', '/' + luxon.year);
    // cy.screenshot();
  });

  it('displays year title', () => {
    getYearSpan().contains(luxon.year);
  });

  it('displays day cards', () => {
    const days = luxon.daysInYear;
    getDayCards().should((t) => expect(t.length).equal(days));
  });

  it('navigates to next year', () => {
    getNextButton().click();
    // cy.screenshot();
    cy.url().should('include', '/' + (luxon.year + 1));
  });

  it('navigates to previous year', () => {
    getPrevButton().click();
    cy.url().should('include', '/' + (luxon.year - 1));
  });

  it('displays day name for large screens', () => {
    getDayOrdinal().should('not.be.visible');
    getDayAbbr().should('not.be.visible');
    getDayName().should('be.visible');
  });

  it('displays day abbr for medium screens', () => {
    cy.viewport('ipad-mini');
    getDayOrdinal().should('not.be.visible');
    getDayAbbr().should('be.visible');
    getDayName().should('not.be.visible');
  });

  it('displays day ordinal for small screens', () => {
    cy.viewport('iphone-8');
    getDayOrdinal().should('be.visible');
    getDayAbbr().should('not.be.visible');
    getDayName().should('not.be.visible');
  });
});
