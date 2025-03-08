describe('Template Spec', () => {
  beforeEach(() => {
    
    cy.fixture('all_users_data.json').then((usersData) => {
      cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users', {
        statusCode: 200,
        body: usersData
      }).as('getUsers');
    });
    
    cy.fixture('pokelax_data.json').then((userData) => {
      cy.intercept('GET', `https://cardfolio-be.onrender.com/api/v1/users/${userData.data.id}`, {
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

    cy.fixture('ancestor_detail_view.json').then((magicCardDetails) => {
      cy.intercept('GET', `https://api.magicthegathering.io/v1/cards/${magicCardDetails.card[0].id}`, {
        statusCode: 200,
        body: magicCardDetails
      }).as('getMagicCardDetails');
    });


    cy.visit('https://cardfolio-fe.onrender.com');

    cy.get('input[name="username"]').type('PokeLax');
    cy.get('button[name="login"]').click();

    cy.get('[href="/mtg_search"] > .homeViewButton').click();
    cy.wait('@getMagicCards'); 
  });


  it('can log in and navigate to Magic search view', () => {
    cy.url().should('include', '/mtg_search');

    cy.get('.MagicContainer').should('exist');
    cy.get('.MagicContainer')
      .should('have.length.greaterThan', 0);
    cy.get('h1').should('exist');
    cy.get('.searchIcon3').should('exist');
    cy.get('.searchBar3').should('exist');
    cy.get('.homeIcon').should('exist');
  });

  it('It can search for a Magic card', () => {
    cy.get('input.searchBar3').type('Angel');
    cy.get('.MTGcard').should('have.length', 1); 
  });

  it('It can direct to a detail Magic card view', () => {
    cy.get('.MTGcard').first().click();
    cy.wait('@getMagicCardDetails');
    cy.url().should('include', '/mtg_search/'); 
    cy.get('h1').should('exist');
  });
});