export class App {
  public visit(): void {
    cy.visit('/');
  }

  // TODO: find out how to select the popover
  // public matDialog = () => cy.get('mat-dialog-container');
}
