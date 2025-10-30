import { HomePage } from '../page-objects/visit_page.js';
import { faker } from '@faker-js/faker';

describe('Accounts - Schedule a meeting Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15'); 

    const homePage = new HomePage(); 
    homePage.open(); 
  });

  it('Get to standard account', () => {   
    cy.get('button', {timeout: 5000}).contains("Účty a karty").should("be.visible").click();
    cy.get('a[href="/cs/osobni-finance/ucty-karty/ucet-standard"]').should("have.text", "Standard účet").click();

    // * Ověření URL
    cy.url("https://www.csas.cz/cs/osobni-finance/ucty-karty/ucet-standard", {timeout: 5000}).should("contain", "ucet-standard");
    
    cy.get('[data-testid="link1"]').should("be.visible").click();

    // * Klik na sjednat na pobočce
    cy.get('[data-testid="column"]', {timeout: 10000})
    cy.contains('a', "Vyhledat a objednat se", {timeout: 5000}).should("be.visible").click()
    cy.contains('h1', "Pobočky a bankomaty").should("be.visible").click()
  });

  it("Search location and schedule a meeting", ()=> {
    cy.visit("https://www.csas.cz/cs/pobocky-a-bankomaty#/");
    cy.url("https://www.csas.cz/cs/pobocky-a-bankomaty", {timeout: 5000}).should("contain", "pobocky-a-bankomaty");

    // * Search
    cy.get('#address_search').type("Praha 2");
    cy.contains('[data-testid="places-search-input--button"]', "Vyhledat").should("be.visible").click();

    // * Schedule a meeting
    cy.contains('[data-testid="button-select--label"]', "Objednat se", {timeout: 5000}).eq(0).should("be.visible").click();

    cy.get('a[href="#/objednani/pobocka/17"]').should("contain", "K bankéři na pobočce").click();

    // * Pick slot
    cy.get('[data-testid=loader--bg] ul[class*=BlockList] button:not([disabled])', {timeout: 5000}).eq(0).click();
   
    cy.contains('a', "Vybrat").eq(0).click();

    cy.get('h1').should("have.text", "Objednání na pobočku");

    // * Fill the form
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const phone = faker.phone.number('+420 ### ### ###');
    const email = faker.internet.email({ firstName, lastName });

    cy.get('#customer\\.firstName', { timeout: 10000 }).should('be.visible').type(firstName);
    cy.get('#customer\\.lastName', { timeout: 10000 }).should('be.visible').type(lastName);
    cy.get('#customer\\.phoneNumber', { timeout: 10000 }).should('be.visible').type(phone);
    cy.get('#customer\\.email', { timeout: 10000 }).should('be.visible').type(email, { delay: 50 });

    // * Choose the topic
    cy.get('[data-testid="select-box-selectbox--input"]').click();
    cy.get('#topic').should('have.attr', 'data-is-open', 'true');
    cy.wait(500)
    cy.get('#topic-listbox').find('[data-testid="select-box-item--1"]').click()

    cy.get('#description', { timeout: 10000 }).should('be.visible').type("Toto je test");

    // ! Zakomentované, aby se schůzka reálně nevytvořila
    // cy.contains('button', "Objednat na pobočku").click();
  })
});