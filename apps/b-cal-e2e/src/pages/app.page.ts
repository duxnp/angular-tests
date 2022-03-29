export class App {
  public visit(): void {
    cy.visit('/');
  }

  public matDialog = () => cy.get('mat-dialog-container');

  public dialogTitle = () => cy.byTestId('modal-title');

  /** Button that opens the theme picker menu */
  public themePickerButton = () => cy.byTestId('theme-picker-button');

  /** The theme picker drop down menu itself */
  public themePickerMenu = () => cy.byTestId('theme-picker-menu');

  /** Theme selection buttons */
  public selectTheme = (theme: string) =>
    this.themePickerMenu().byTestId(theme);

  // Stylesheet link element
  public themeStylesheet = () =>
    cy.get('link[rel="stylesheet"].style-manager-theme');
}
