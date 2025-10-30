import { HomePage } from '../page-objects/visit_page.js';

describe('Home Page Open and Cookie Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15'); 
  });

  const homePage = new HomePage();

  it('should open the home page', () => {
    homePage.open(); 
  });
});