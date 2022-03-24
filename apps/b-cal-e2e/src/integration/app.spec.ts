describe('beday app', () => {
  beforeEach(() => cy.visit('/'));

  it('displays correct title', () => {
    cy.title().should('eq', 'Beluvian Calendar');
  });
});
