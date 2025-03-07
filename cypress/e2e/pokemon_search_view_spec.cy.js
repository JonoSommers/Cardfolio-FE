describe('Login Test', () => {
  beforeEach(() => {
    // Visit the live frontend URL
    cy.visit('https://cardfolio-fe.onrender.com');
    
    // Load the fixture data and intercept real API calls
    cy.fixture('all_users_data.json').then((usersData) => {
      // Intercept the GET request for all users from the live API
      cy.intercept('GET', 'https://cardfolio-be.onrender.com/api/v1/users', {
        statusCode: 200,
        body: usersData
      }).as('getUsers');
      
      // Find the PokeLax user in the fixture data
      const pokeLaxUser = usersData.data.find(user => user.attributes.username === 'PokeLax');
      
      if (pokeLaxUser) {
        // Intercept the GET request for a specific user's details from the live API
        cy.intercept('GET', `https://cardfolio-be.onrender.com/api/v1/users/${pokeLaxUser.id}`, {
          statusCode: 200,
          body: {
            data: {
              id: pokeLaxUser.id,
              type: "user",
              attributes: {
                username: "PokeLax",
                favoriteCards: [] // Ensure an array exists to avoid `.map()` crash
              }
            }
          }).as('getUserDetails');
      }
    });

    // Type "PokeLax" into the username input
    cy.get('input[name="username"]').type('PokeLax');

    // Click the login button
    cy.get('button[name="login"]').click();

    // Wait for both API calls to finish
    cy.wait('@getUsers');
    cy.wait('@getUserDetails');

    // Verify login by checking navigation to the correc
