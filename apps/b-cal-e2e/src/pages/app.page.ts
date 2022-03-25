export class App {
  public visit(): void {
    cy.visit('/');
  }

  public matDialog = () => cy.get('mat-dialog-container');

  public dialogTitle = () => cy.get('[data-testid="modal-title"]');
}
