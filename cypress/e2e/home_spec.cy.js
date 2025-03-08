describe('User Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', ' https://cardfolio-be.onrender.com/api/v1/users', { fixture: 'all_users_data.json' }).as('AllUsers_data')
    cy.intercept('GET', ' https://cardfolio-be.onrender.com/api/v1/users/2', { fixture: 'magicman122_data.json' }).as('MagicMan_data')
    cy.visit('https://cardfolio-fe.onrender.com')
  })
  
  it('Can access the homepage by logging in', () => {
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()
    cy.url().should('include', '/MagicMan122')
  });

  it('Load username and Cardgame buttons', () => {
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()

    cy.get('.homeViewButton').eq(0).should('contain', 'Pokemon')
    cy.get('.homeViewButton').eq(1).should('contain', 'MTG')
    cy.get('div').should('contain', 'MagicMan122')
  });

  it('Can Navigate to Pokemon Search Page', () => {
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()

    cy.get('.homeViewButton').eq(0).click()
    cy.url().should('include', '/pokemon_search')
  });

  it('Can Navigate to MTG Search Page', () => {
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()

    cy.get('.homeViewButton').eq(1).click()
    cy.url().should('include', '/mtg_search')
  });

  it('Loads correct binders', () => {
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()

    cy.get('.bindersButton').eq(0).should('contain', 'Default Binder')
    cy.get('.bindersButton').eq(1).should('contain', 'test_binder')
  });

  it('Can Navigate to Default Binder Page', () => {
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()

    cy.get('.bindersButton').eq(0).click()
    cy.url().should('include', '/binder/Default%20Binder')
  });

  it('Can Navigate to test_binder Page', () => {
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()

    cy.get('.bindersButton').eq(1).click()
    cy.url().should('include', '/binder/test_binder')
  });

  it('Does not load the create Binders button if user has more than one binder', () => {
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()

    cy.get('.createbinder').should('not.exist')
  });

  it('Loads the create Binders button if user has only one binder', () => {
    cy.intercept('GET', ' https://cardfolio-be.onrender.com/api/v1/users/1', { fixture: 'pokelax_data.json' })

    cy.get('input[name="username"]').type('PokeLax')
    cy.get('button[name=login]').click()

    cy.get('.createbinder').should('contain', 'Create A New Binder')
  });

  it('Can navigate to create binder page', () => {
    cy.intercept('GET', ' https://cardfolio-be.onrender.com/api/v1/users/1', { fixture: 'pokelax_data.json' })
    cy.get('input[name="username"]').type('PokeLax')
    cy.get('button[name=login]').click()

    cy.get('.createbinder').should('contain', 'Create A New Binder').click()
    cy.url().should('include', '/createbinder')
  });

  it('Can create a new binder', () => {
    cy.intercept('GET', ' https://cardfolio-be.onrender.com/api/v1/users/1', { fixture: 'pokelax_data.json' }).as('Initial Data')
    cy.intercept('POST', ' https://cardfolio-be.onrender.com/api/v1/users/1/binders', { fixture: 'test_binder.json' }).as('Create Binder')
    cy.get('input[name="username"]').type('PokeLax')
    cy.get('button[name=login]').click()
    cy.wait('@Initial Data')

    cy.get('.createbinder').should('contain', 'Create A New Binder').click()
    cy.get('input[name="binderName"]').type('Test Binder')
    
    
    cy.intercept('GET', ' https://cardfolio-be.onrender.com/api/v1/users/1', { fixture: 'pokelax_data2.json' }).as('Updated Data')
    cy.get('button').click()
    cy.wait('@Updated Data')

    cy.get('.bindersButton').eq(0).should('contain', 'Default Binder')
    cy.get('.bindersButton').eq(1).should('contain', 'test_binder')
  });

  it('Shows an error message if binder name is not entered', () => {
    cy.intercept('GET', ' https://cardfolio-be.onrender.com/api/v1/users/1', { fixture: 'pokelax_data.json' }).as('Initial Data')
    cy.intercept('POST', ' https://cardfolio-be.onrender.com/api/v1/users/1/binders', { fixture: 'test_binder.json' }).as('Create Binder')
    cy.get('input[name="username"]').type('PokeLax')
    cy.get('button[name=login]').click()
    cy.wait('@Initial Data')

    cy.get('.createbinder').should('contain', 'Create A New Binder').click()
    
    cy.get('button').click()
    cy.get('.error-message').should('contain', 'Please enter a binder name.')
  });
});