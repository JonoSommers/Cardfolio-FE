describe('Template Spec', () => {
  beforeEach(() => {
    
    cy.fixture('all_users_data.json').then((usersData) => {
      cy.intercept('GET', 'http://localhost:3000/api/v1/users', {
        statusCode: 200,
        body: usersData
      }).as('getUsers');
    });
    
    cy.fixture('pokelax_data.json').then((userData) => {
      cy.intercept('GET', `http://localhost:3000/api/v1/users/${userData.data.id}`, {
        statusCode: 200,
        body: userData,
      }).as('getUserDetails');
    });
    

    cy.fixture(`magic_cards_view.json`).then((magicCards) => {
      cy.intercept('GET', `https://api.magicthegathering.io/v1/cards`, {
        statusCode: 200,
        body: magicCards
      }).as('getMagicCards')
    });

    cy.visit('https://cardfolio-fe.onrender.com');

    cy.get('input[name="username"]').type('PokeLax');
    cy.get('button[name="login"]').click();

    cy.get('[href="/mtg_search"] > .homeViewButton').click();
  });

  
  it('can log in and navigate to Magic search view', () => {
    cy.url().should('include', '/mtg_search');

    cy.wait('@getMagicCards'); 

    cy.get('.MTGSearchView').should('exist');
    cy.get('h1').should('exist');
    cy.get('.searchIcon3').should('exist');
    cy.get('.searchBar3').should('exist');
    cy.get('.homeIcon').should('exist');
  });
  it('can log in, navigate to Magic search, and search for a Magic card', () => {
    cy.wait('@getMagicCards');

    cy.get('input.searchBar3').type('Anc');
    cy.get('.card').should('have.length', 1); 
  });
});