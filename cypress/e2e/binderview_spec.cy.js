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
		cy.get('.bindersButton').click()
  })

  it('Binderview Layout', () => {
		cy.get('img.homeIcon').should('be.visible');
		cy.get('h1.binderName').should('be.visible');
		cy.get('img.searchIcon').should('be.visible');
		cy.get('input.searchBar').should('be.visible');
		cy.get('button.renameButton').should('be.visible');
		cy.get('.binderCards').should('be.visible')
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

	it('Rename Button Redirects to Home on Submit', () =>{
		cy.get('button.renameButton').click()
		cy.get('input.newBinderName').type('New Binder Name').should('have.value', 'New Binder Name');
		cy.get('form').click()
		cy.url().should('include', '/PokeLax')
		cy.get('.bindersButton').click()
		cy.get('h1.binderName').should('contain', 'New Binder Name');
	})
})