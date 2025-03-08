describe('MagicDetailView Spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users', {
      statusCode: 200,
      fixture: 'all_users_data.json'
    }).as('fetchAllUsers');

    cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users/2', {
      statusCode: 200,
      fixture: 'magicman122_binderview_data.json'
    }).as('fetchUserData');

    cy.intercept('GET', 'https://api.magicthegathering.io/v1/cards', {
      fixture: 'magic_cards_view.json'
    }).as('fetchCardsView')

    cy.intercept('GET', 'https://api.magicthegathering.io/v1/cards/1', {
      fixture: 'magic_card_view.json'
    }).as('fetchCardDetails')

    cy.visit('https://cardfolio-fe.onrender.com')
    cy.wait('@fetchAllUsers')
    cy.get('input').type('MagicMan122')
    cy.get('.login_button').click()
    cy.wait('@fetchUserData')
    cy.url().should('include', '/MagicMan122')
    
    cy.get('.homeViewButton').eq(1).should('contain', "MTG").click()
    cy.url().should('include', '/mtg_search')
  })
  
  it('should display card details correctly', () => {
    cy.wait('@fetchCardsView')
    cy.get('.MTGcard').first().click()
    cy.wait('@fetchCardDetails')
    cy.get('h1').should('contain', "Ancestor's Chosen")
    cy.get('img').should('have.attr', 'src', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card')
    cy.get('.add').should('contain', 'Add To Binder')
    cy.get('.back > button').should('contain', 'Back')
  })

  it('should add a card to the selected binder', () => {
    cy.wait('@fetchCardsView');
  
    cy.get('.MTGcard').first().click();
    cy.wait('@fetchCardDetails');
  
    cy.intercept('POST', 'https://cardfolio-be.onrender.com/api/v1/users/2/binders/2/binder_cards', {
      statusCode: 200,
      fixture: 'magic_card_submit.json'
    }).as('addCard');

    cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users/2', {
      statusCode: 200,
      fixture: 'magicman122_card_submit.json'
    }).as('fetchBinderView')
  
    cy.get('.add').click();
    cy.wait('@addCard')
    cy.get('.back > button').click()
    cy.get('.homeIcon').click()
    cy.wait('@fetchBinderView')
    cy.get('.bindersButton').click()
    cy.get('.card').should('be.visible')
  });
})
