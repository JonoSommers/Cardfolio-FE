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
    

    cy.fixture(`pokemon_cards_view.json`).then((pokeCards) => {
      cy.intercept('GET', `https://api.pokemontcg.io/v2/cards?page=1&pageSize=100`, {
        statusCode: 200,
        body: pokeCards,
      }).as('getPokeCards')
    })

    cy.visit('https://cardfolio-fe.onrender.com');
  });

  it('can login and got to pokemon search view', () => {
    cy.get('input[name="username"]').type('PokeLax');
    cy.get('button[name="login"]').click();
    cy.get('[href="/pokemon_search"] > .homeViewButton').click();

    cy.url().should('include', '/pokemon_search');
    cy.get('h1').should('exist')
    cy.get('.PokemonSearchView').should('exist');
    cy.get('.search-card')
      .should('have.length.greaterThan', 0);
    cy.get('.searchIcon2').should('exist')
    cy.get('.searchBar2').should('exist')
    cy.get('.homeIcon').should('exist')
  });
  
  // Add test for typing input into searchbar
  // clicking a card brings user to detailview
});
