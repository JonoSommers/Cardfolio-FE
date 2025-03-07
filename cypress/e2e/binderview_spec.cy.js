import cards from '../fixtures/pokelax_binderview_data.json'

describe('Binderview Spec', () => {
	beforeEach(() => {
		cy.intercept('GET', 'http://localhost:3000/api/v1/users', {
      statusCode: 200,
      fixture: 'all_users_data.json'
    })
    .as('fetchAllUsers');

		cy.intercept('GET', 'http://localhost:3000/api/v1/users/1', {
      statusCode: 200,
      fixture: 'pokelax_binderview_data.json'
    })
    .as('fetchUserData');
		
    cy.visit('http://localhost:5173')
		cy.wait('@fetchAllUsers')
    cy.get('input').type('PokeLax')
		cy.get('.login_button').click()
		cy.wait('@fetchUserData')
		cy.url().should('include', '/PokeLax')
		cy.get('.bindersButton').should('contain', 'Default Binder').click()
		cy.url().should('include', 'Default%20Binder')
  })

  it('Binderview Layout', () => {
		cy.get('img.homeIcon').should('be.visible');		
		cy.get('h1.binderName').should('be.visible');
		cy.get('img.searchIcon').should('be.visible');
		cy.get('input.searchBar').should('be.visible');
		cy.get('button.renameButton').should('be.visible');
		cy.get('.binderCards').should('be.visible')
  })

	it('Displays the cards in the users binder', () => {
		cy.get('section.binderCards').first().should('be.visible')
		cy.get('section.binderCards').last().should('be.visible')

	})

	it('Home Button', () => {
		cy.get('img.homeIcon').should('be.visible');
    cy.get('img.homeIcon').click();
    cy.url().should('include', '/PokeLax');
  })

	it('Rename Button Layout', () => {
		cy.get('button.renameButton').should('be.visible');
		cy.get('button.renameButton').click()
		cy.get('input.newBinderName').should('be.visible')
		cy.get('button').should('contain', 'Submit').should('be.visible')
	})

	it('Rename Button Redirects to Home on Submit', () => {
		cy.intercept('PATCH', 'http://localhost:3000/api/v1/users/1/binders/1', {
      statusCode: 200,
      fixture: 'pokelax_bindername_submit.json'
    })
    .as('changeBinderName');

		cy.intercept('GET', 'http://localhost:3000/api/v1/users/1', {
      statusCode: 200,
      fixture: 'pokelax_newbindername_data.json'
    })
		.as('newUserData')

		cy.get('button.renameButton').click()
		cy.get('input.newBinderName').type('New Binder Name').should('have.value', 'New Binder Name');
		cy.get('form').click()
		cy.wait('@changeBinderName')
		cy.wait('@newUserData')
		cy.url().should('include', '/PokeLax')
		cy.get('.bindersButton').should('contain', 'New Binder Name').click()	
		cy.get('h1.binderName').should('contain', 'New Binder Name');
		cy.url().should('include', 'New%20Binder%20Name')
	})

	it('Search will only show cards that have been searched for', () => {
		cy.get('input.searchBar').type('Amp')
		cy.get('section.binderCards').first('.img[alt="Ampharos"').should('be.visible')
	})

	it('Allows you click a card for more detailed view', () => {
		cy.get('section.binderCards').first().click()
		cy.url().should('include', '/Ampharos')
	})

})