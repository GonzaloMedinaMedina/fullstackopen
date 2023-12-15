describe('Blog app', function() {
  let fakeUser,
    fakeBlog;

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    fakeUser = {
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
      logIn();

      cy.get('.success')
      .should('contain', `User ${fakeUser.username} successfully logged!`) 
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function() {
      logIn('invalid username', 'invalid password');

      cy.get('.error')
        .should('contain', 'Wrong credentials') 
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() 
    {
      logIn();
      fakeBlog = {
        title: 'new title',
        author: 'new author',
        likes: 0,
        url: 'new url'
      }
    })

    it('A blog can be created', function() {
      createBlog();

      cy.contains(fakeBlog.title);
      cy.contains(fakeBlog.author);
      cy.contains(fakeBlog.url);
    })

  })

  describe('When a user creates a blog', function () {
    beforeEach(function()
    {
      logIn();
      fakeBlog = {
        title: 'new title',
        author: 'new author',
        likes: 0,
        url: 'new url'
      }
      createBlog();
    })

    it('A user can like the blog', function() {
      cy.get('#viewBlog').click()
      cy.get('#likeBlog').click()
      cy.get('#like').should('contain', '1')
    })

    it('A user can remove the blog', function() {
      cy.get('#viewBlog').click()
      cy.get('#deleteBlog').click()

      cy.contains(fakeBlog.title).should('not.exist')
    })
  })

  const logIn = (username = fakeUser.username, password = fakeUser.password) => 
  {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
  }

  const createBlog = () =>
  {
    cy.get('#toggable-hidden').click()

    cy.get('#title').type(fakeBlog.title)
    cy.get('#author').type(fakeBlog.author)
    cy.get('#url').type(fakeBlog.url)

    cy.get('#createBlog').click()
  }
})

