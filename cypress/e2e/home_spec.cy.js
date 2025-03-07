describe('User Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users', { fixture: 'all_users_data.json' })
    cy.intercept('GET', 'https://cardfolio-be.onrender.com/users/api/v1/users/2', { fixture: 'magicman122_data.json' })
    cy.intercept('GET', 'http://localhost:3000/api/v1/users', { fixture: 'all_users_data.json' })
    cy.intercept('GET', 'http://localhost:3000/api/v1/users/2', { fixture: 'magicman122_data.json' })
    cy.intercept('GET', 'http://localhost:3000/api/v1/users/1', { fixture: 'pokelax_data.json' })
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

  it('Does not load the create Binders button if user has more than one binder', () => {
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()

    cy.get('.createbinder').should('not.exist')
  });

  it('Loads the create Binders button if user has only one binder', () => {
    cy.get('input[name="username"]').type('PokeLax')
    cy.get('button[name=login]').click()

    cy.get('.createbinder').should('contain', 'Create A New Binder')
  });


 

})