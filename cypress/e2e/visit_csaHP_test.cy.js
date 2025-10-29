import { HomePage } from '../page-objects/visit_page.js';

describe('Home Page open and cookie Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15'); 
  });

  const homePage = new HomePage();

  it('should open the base page', () => {
    homePage.open(); 
  });
});