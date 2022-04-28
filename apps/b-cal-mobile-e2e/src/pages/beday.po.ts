import { App } from './app.po';

export class Beday extends App {
  public override visit(): void {
    cy.visit('/beday/3');
  }

  public bedayTitle = (): Cypress.Chainable<JQuery<HTMLElement>> =>
    cy.findByTestId('beday-title');

  public audio = (): Cypress.Chainable<JQuery<HTMLAudioElement>> =>
    cy.get('audio[controls]');
}
