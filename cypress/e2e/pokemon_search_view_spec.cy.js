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
    

    cy.fixture(`pokemon_cards_view.json`).then((pokeCards) => {
      cy.intercept('GET', `https://api.pokemontcg.io/v2/cards?page=1&pageSize=100`, {
        statusCode: 200,
        body: pokeCards,
      }).as('getPokeCards')
    })

    cy.fixture('venus_detailed_view.json').then((pokeCardDetails) => {
      cy.intercept('GET', `https://api.pokemontcg.io/v2/cards/${pokeCardDetails.data.id}`, {
        statusCode: 200,
        body: pokeCardDetails
      }).as('getPokeCardDetails');
    });

    cy.visit('https://cardfolio-fe.onrender.com');

    cy.get('input[name="username"]').type('PokeLax');
    cy.get('button[name="login"]').click();
    cy.get('[href="/pokemon_search"] > .homeViewButton').click();

    cy.wait('@getPokeCards')
  });

  it('can login and got to pokemon search view', () => {
    cy.url().should('include', '/pokemon_search');

    cy.get('h1').should('exist')
    cy.get('.PokemonSearchView').should('exist');
    cy.get('.search-card')
      .should('have.length.greaterThan', 0);
    cy.get('.searchIcon3').should('exist')
    cy.get('.searchBar2').should('exist')
    cy.get('.homeIcon').should('exist')
  });

  it('It can search for a Pokemon card', () => {
    cy.get('input.searchBar2').type('Venus');
    cy.get('.search-card').should('have.length', 1); 
  });

  it('It can view a Pokémon card detail', () => {

    cy.get(':nth-child(1) > .card-link > .search-card').click();

    cy.wait('@getPokeCardDetails');

    cy.get('@getPokeCardDetails').then(({ response }) => {
      const cardId = response.body.data.id;

    cy.url().should('include', `/pokemon_search/${cardId}`);
    });
  });
});
