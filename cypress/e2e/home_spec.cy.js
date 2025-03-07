describe('User Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/users', { fixture: 'all_users_data.json' })
    cy.intercept('GET', 'https://cardfolio-be.onrender.com/users/2', { fixture: 'magicman122_data.json' })
  })
  
  it('Loads and displays both binders', () => {
    cy.visit('https://cardfolio-fe.onrender.com')
    cy.get('input[name="username"]').type('MagicMan122')
    cy.get('button[name=login]').click()
  });


})