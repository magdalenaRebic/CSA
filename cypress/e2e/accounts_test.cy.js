import { HomePage } from '../page-objects/visit_page.js';
import { AccountInfo } from '../page-objects/accounts_offers.js';


describe('Accounts Offers Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');  // nebo 'macbook-16', '1920,1080'
  });

  const homePage = new HomePage(); // ✅ vytvoříš instanci

  it('should open the base page', () => {
    homePage.open(); // ✅ voláš metodu na instanci
    cy.get('button').contains("Účty a karty").should("be.visible").click();
    cy.get('a[href="/cs/osobni-finance/ucty-karty/ucet-standard"]').should("have.text", "Standard účet").click();

    //ověření URL
    cy.url("https://www.csas.cz/cs/osobni-finance/ucty-karty/ucet-standard", {timeout: 5000}).should("contain", "ucet-standard");
    
    cy.get('[data-testid="link1"]').should("be.visible").click();

    //klik na sjednat na pobočce
    cy.get('[data-testid="column"]', {timeout: 10000})
    cy.contains('a', "Vyhledat a objednat se").click()

    
  });

  

});