import { Beday } from '../pages/beday.page';

describe('beday dialog', () => {
  let page: Beday;

  beforeEach(() => {
    page = new Beday();
    page.visit();
  });

  it('opens dialog', () => {
    cy.url().should('include', '/2022/3');
    page.matDialog().should('exist');
  });

  it('displays beday information', () => {
    page.dialogTitle().contains('Essissday');
  });

  it('plays audio', () => {
    page.audio().then(([audioEl]) => {
      // Muting the audio player so I don't get scared every time an interactive test runs
      audioEl.muted = true;
      expect(audioEl.paused).to.equal(true);
      audioEl.play();
      expect(audioEl.paused).to.equal(false);
    });
  });
});
