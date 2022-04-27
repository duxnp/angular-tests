import { Beday } from '../pages/beday.po';

describe('beday dialog', () => {
  let page: Beday;

  beforeEach(() => {
    page = new Beday();
    page.visit();
  });

  it('navigates to beday page', () => {
    cy.url().should('include', '/beday/3');
  });

  it('displays beday information', () => {
    page.bedayTitle().contains('Essissday');
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
