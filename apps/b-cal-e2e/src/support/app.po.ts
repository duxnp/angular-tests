export const getYearSpan = () => cy.get('[data-testid="year-span"]');
export const getNextButton = () => cy.get('[data-testid="next-button"]');
export const getPrevButton = () => cy.get('[data-testid="previous-button"]');

// Day cards acting as padding don't contain the div element
export const getDayCards = () => cy.get('bc-day-card > div');
