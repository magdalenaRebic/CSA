import { HomePage } from '../page-objects/visit_page.js';
import { faker } from '@faker-js/faker';

const accountsCards = "Účty a karty";
const standardAccount = "Standard účet";
const standardAccountUrl = "https://www.csas.cz/cs/osobni-finance/ucty-karty/ucet-standard"
const standardAccountUrlCheck = "ucet-standard"
const searchLocationBtn = "Vyhledat a objednat se";
const branchesAtm = "Pobočky a bankomaty";
const branchesAtmUrl = "https://www.csas.cz/cs/pobocky-a-bankomaty"
const branchesAtmUrlCheck = "pobocky-a-bankomaty";
const branchLocation = "Praha 2";
const searchBtn = "Vyhledat";
const setMeetingBtn = "Objednat se"
const meetBanker = "K bankéři na pobočce"
const meetBankerH1 = "Objednání na pobočku"

describe('Accounts - Schedule a meeting Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15'); 

    const homePage = new HomePage(); 
    homePage.open(); 
  });

  it('Get to standard account', () => {   
    cy.get('button').contains(accountsCards).click();
    cy.get('a[href="/cs/osobni-finance/ucty-karty/ucet-standard"]').should("have.text", standardAccount).click();

    // * Ověření URL
    cy.url(standardAccountUrl).should("contain", standardAccountUrlCheck);
    
    cy.get('[data-testid="link1"]').click();

    // * Klik na sjednat na pobočce
    cy.get('[data-testid="column"]')
    cy.contains('a', searchLocationBtn).click()
    cy.contains('h1', branchesAtm).click()
  });

  it("Search location and schedule a meeting", ()=> {
    //cy.visit("https://www.csas.cz/cs/pobocky-a-bankomaty#/");
    cy.get('[data-gem-id="link-3"]').click()
    cy.url(branchesAtmUrl).should("contain", branchesAtmUrlCheck);

    // * Search
    cy.get('#address_search').type(branchLocation);
    cy.contains('[data-testid="places-search-input--button"]', searchBtn).click();

    // * Schedule a meeting
    cy.contains('[data-testid="button-select--label"]', setMeetingBtn ).eq(0).click();

    cy.get('a[href="#/objednani/pobocka/17"]').should("contain", meetBanker).click();

    // * Pick slot
    cy.get('[data-testid=loader--bg] ul[class*=BlockList] button:not([disabled])',).eq(0).click();
   
    cy.contains('a', "Vybrat").eq(0).click();

    cy.get('h1').should("have.text", meetBankerH1);

    // * Fill the form
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const phone = faker.phone.number('+420 ### ### ###');
    const email = faker.internet.email({ firstName, lastName });

    cy.get('#customer\\.firstName').type(firstName);
    cy.get('#customer\\.lastName').type(lastName);
    cy.get('#customer\\.phoneNumber').type(phone);
    cy.get('#customer\\.email').type(email, { delay: 50 });

    cy.get('[data-testid="textfield--input"]').invoke('val').should("not.be.empty")

    // * Choose the topic
    cy.get('[data-testid="select-box-selectbox--input"]').click();
    cy.get('#topic').should('have.attr', 'data-is-open', 'true');
    cy.get('#topic-listbox', {timeout: 5000}).find('[data-testid="select-box-item--1"]').click()

    cy.get('#description').type("Toto je test");

    // ! Zakomentované, aby se schůzka reálně nevytvořila
    // cy.contains('button', "Objednat na pobočku").click();
  })
});