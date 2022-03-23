import { DateTime } from 'luxon';

import {
  getDayCards,
  getNextButton,
  getPrevButton,
  getYearSpan
} from '../support/app.po';

describe('b-cal', () => {
  const luxon = DateTime.now();

  beforeEach(() => cy.visit('/'));

  it('redirects to current year', () => {
    cy.url().should('include', '/' + luxon.year);
    cy.screenshot();
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
    cy.screenshot();
    cy.url().should('include', '/' + (luxon.year + 1));
  });

  it('navigates to previous year', () => {
    getPrevButton().click();
    cy.url().should('include', '/' + (luxon.year - 1));
  });
});
