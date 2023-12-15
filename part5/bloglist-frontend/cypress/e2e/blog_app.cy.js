describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const fakeUser = {
      name: 'fake name',
      username: 'fake username',
      password: 'fake password'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', fakeUser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('fake username')
      cy.get('#password').type('fake password')
      cy.get('#login-button').click()

      cy.get('.success')
      .should('contain', 'User fake username successfully logged!') 
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('invalid username')
      cy.get('#password').type('invalid password')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials') 
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})