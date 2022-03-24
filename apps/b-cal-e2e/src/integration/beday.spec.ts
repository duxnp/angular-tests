import {
  getAudioPlayer,
  getDialogTitle,
  getFirstSat,
  getMatDialog
} from '../support/app.po';

describe('beday dialog', () => {
  beforeEach(() => cy.visit('/'));

  it('navigates and opens dialog on click', () => {
    getFirstSat().click();

    cy.url().should('include', '/2022/1');
    getMatDialog().should('exist');
  });

  it('displays beday information', () => {
    cy.visit('/2022/3');

    getDialogTitle().contains('Essissday');
  });

  it('plays audio', () => {
    cy.visit('/2022/3');

    getAudioPlayer().then(([audioEl]) => {
      // Muting the audio player so I don't get scared every time a watched test runs
      audioEl.muted = true;
      expect(audioEl.paused).to.equal(true);
      audioEl.play();
      expect(audioEl.paused).to.equal(false);
    });
  });
});
