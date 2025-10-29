export class HomePage {
  constructor() {
    this.url = 'https://www.csas.cz/cs/osobni-finance'; // nebo tvoje cílová stránka
    this.cookieAcceptButton = '#popin_tc_privacy_button'
  }

  open() {
    cy.visit(this.url);
    this.acceptCookies(); // 💡 zavolá se automaticky při otevření
    return this;
  }

  acceptCookies() {
    cy.get('#popin_tc_privacy', { timeout: 5000 });
    cy.get('#popin_tc_privacy_button').should("be.visible").click()
  }
}