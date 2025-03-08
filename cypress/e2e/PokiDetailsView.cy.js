describe('PokiDetailView Spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users', {
      statusCode: 200,
      fixture: 'all_users_data.json'
    }).as('fetchAllUsers');

    cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users/1', {
      statusCode: 200,
      fixture: 'pokelax_data.json'
    }).as('fetchUserData');

    cy.intercept('GET', 'https://api.pokemontcg.io/v2/cards?page=1&pageSize=100', {
      fixture: 'pokemon_cards_view.json'
    }).as('fetchCardsView');

    cy.intercept('GET', 'https://api.pokemontcg.io/v2/cards/1', {
      fixture: 'pokemon_card_view.json'
    }).as('fetchCardDetails');

    cy.visit('https://cardfolio-fe.onrender.com');
    cy.wait('@fetchAllUsers');
    cy.get('input').type('PokeLax');
    cy.get('.login_button').click();
    cy.wait('@fetchUserData');
    cy.url().should('include', '/PokeLax');
    
    cy.get('[href="/pokemon_search"] > .homeViewButton').should('contain', "Pokemon").click();
    cy.url().should('include', '/pokemon_search');
  });

  it('should display card details correctly', () => {
    cy.wait('@fetchCardsView');
    cy.get('.search-card').first().click();
    cy.wait('@fetchCardDetails');
    cy.get('h1').should('contain', "Venusaur-EX");
    cy.get('img').should('have.attr', 'src', 'https://images.pokemontcg.io/xy1/1.png');
    cy.get('.add').should('contain', 'Add To Binder');
    cy.get('.back > button').should('contain', 'Back');
  });

  it('should add a card to the selected binder', () => {
    cy.wait('@fetchCardsView');
  
    cy.get('.search-card').first().click();
    cy.wait('@fetchCardDetails');
  
    cy.intercept('POST', 'https://cardfolio-be.onrender.com/api/v1/users/1/binders/1/binder_cards', {
      statusCode: 200,
      fixture: 'pokemon_card_submit.json'
    }).as('addCard');

    cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users/1', {
      statusCode: 200,
      fixture: 'Pokelax_card_submit.json'
    }).as('fetchBinderView');
  
    cy.get('.add').click();
    cy.wait('@addCard');
    cy.get('.back > button').click();
    cy.get('.homeIcon').click();
    cy.wait('@fetchBinderView');
    cy.get('.bindersButton').click();
    cy.get('.card').should('be.visible');
  });
});