export class HomePage {
  constructor() {
    this.url = 'https://www.csas.cz/cs/osobni-finance';
  }

  open() {
    cy.visit(this.url);
    this.acceptCookies();
    return this;
  }

  acceptCookies() {
    cy.get('#popin_tc_privacy', { timeout: 5000 });
    cy.get('#popin_tc_privacy_button').should("be.visible").click();
  }
};