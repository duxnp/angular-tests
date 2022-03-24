export const getMatDialog = () => cy.get('mat-dialog-container');

export const getDialogTitle = () => cy.get('[data-testid="modal-title"]');

export const getAudioPlayer = (): Cypress.Chainable<JQuery<HTMLAudioElement>> =>
  cy.get('audio[controls]');
