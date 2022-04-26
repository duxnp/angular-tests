/**
 * Page object for the calendar Year page.
 * "Page object" is a design pattern, not a Cypress concept.
 * https://testing-angular.com/end-to-end-testing/#page-objects
 */
export class Year {
  public visit(): void {
    cy.visit('/');
  }

  // Page interaction example
  // public searchFor(term: string): void {
  //   cy.byTestId('search-term-input').first().clear().type(term);
  //   cy.byTestId('submit-search').first().click();
  // }

  // DOM query example
  // public photoItemLinks(): Cypress.Chainable<JQuery<HTMLElement>> {
  //   return cy.byTestId('photo-item-link');
  // }

  // Explicitly typing the return value may be useful sometimes
  public yearTitle = (): Cypress.Chainable<JQuery<HTMLElement>> =>
    cy.findByTestId('year-span');
  public nextButton = () => cy.findByTestId('next-button');
  public prevButton = () => cy.findByTestId('previous-button');
  public navMenu = () => cy.findByTestId('year-nav-menu');
  public navFirst = () => cy.findByTestId('first');
  public navCurrent = () => cy.findByTestId('current');
  public navLast = () => cy.findByTestId('last');

  // Day cards acting as padding don't contain the div element
  public dayCards = () => cy.get('bc-day-card > div');

  // The first saturday of the year is guarunteed to have a day
  public firstSaturday = () =>
    cy.get(':nth-child(7) > [data-testid="card-div"]');

  public dayOrdinal = () => this.firstSaturday().findByTestId('ordinal-span');

  public dayAbbr = () => this.firstSaturday().findByTestId('abbr-span');

  public dayName = () => this.firstSaturday().findByTestId('name-span');
}
