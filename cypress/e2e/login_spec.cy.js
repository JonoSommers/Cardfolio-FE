describe('Login', () => {
  beforeEach(() => {
		cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users', {
      statusCode: 200,
      fixture: 'all_users_data.json'
    })
    .as('getAllUsers');
		
    cy.visit('https://cardfolio-fe.onrender.com/')
		cy.wait('@getAllUsers')
  })

  it('is the correct URL', () => {
    cy.url().should('contain', 'https://cardfolio-fe.onrender.com/')
  })

  it('displays Cardfolio on page load', () => {
    cy.get('h1').contains('Cardfolio')
  })

  it('displays the login button, create account button, and input field', () => {
    cy.get('.Snorlax > main').contains('button', 'Login')
    cy.get('.Snorlax > main').contains('button', 'Create Account')
    cy.get('input').should('be.visible')
  })

  it('should create an account, display a confirmation message, and leave the username in the input field', () => {
    cy.intercept('POST', 'https://cardfolio-be.onrender.com/api/v1/users', {
      statusCode: 200,
      fixture: 'new_user.json'
    })
    .as('createAccount');

    cy.get('input').type('testuser123456789')
    cy.get('button.submit_button').click()
    cy.wait('@createAccount')
    cy.get('input').should('have.value', 'testuser123456789')
    cy.get('p').should('contain', 'The account with the username testuser123456789 has been created')
  })

  it('navigates a user to the Home Page upon a succesful login', () => {
    cy.get('input').type('PokeLax')
    cy.get('button.login_button').click()
    cy.url().should('contain', 'https://cardfolio-fe.onrender.com/PokeLax')
  })

  it('should display an error message if the username does not exist', () => {
    cy.get('input').type('NotARealUsername')
    cy.get('button.login_button').click()
    cy.get('p').should('contain', 'User NotARealUsername not found')
  })
})