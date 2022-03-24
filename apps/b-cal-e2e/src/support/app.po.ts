export const getYearSpan = () => cy.get('[data-testid="year-span"]');
export const getNextButton = () => cy.get('[data-testid="next-button"]');
export const getPrevButton = () => cy.get('[data-testid="previous-button"]');

// Day cards acting as padding don't contain the div element
export const getDayCards = () => cy.get('bc-day-card > div');

// The first saturday of the year is guarunteed to have a day
export const getFirstSat = () =>
  cy.get(':nth-child(7) > [data-testid="card-div"]');

export const getDayOrdinal = () =>
  getFirstSat().get('[data-testid="ordinal-span"]');

export const getDayAbbr = () => getFirstSat().get('[data-testid="abbr-span"]');

export const getDayName = () => getFirstSat().get('[data-testid="name-span"]');

export const getMatDialog = () => cy.get('mat-dialog-container');

export const getDialogTitle = () => cy.get('[data-testid="modal-title"]');

export const getAudioPlayer = (): Cypress.Chainable<JQuery<HTMLAudioElement>> =>
  cy.get('audio[controls]');
