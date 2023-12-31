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

    it('Another user can not see the remove button of the blog', function() {
      let secondFakeUser = {
        name: 'second fake name',
        username: 'second fake username',
        password: 'second fake password'
      }

      cy.request('POST', 'http://localhost:3001/api/users/', secondFakeUser)
      logOut();
      logIn(secondFakeUser.username, secondFakeUser.password);
      cy.get('#viewBlog').click()
      cy.contains('remove').should('not.exist')
    })
  })

  describe('When there are more than one blog', function () {
    let secondFakeBlog;

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

      secondFakeBlog = {
        title: 'second new title',
        author: 'second new author',
        likes: 0,
        url: 'second new url'
      }

      createBlog(secondFakeBlog)
    })  
  
    it('Blogs are ordered by number of likes', function () {
      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.blog').eq(1).contains('like').click()

      cy.get('.blog').eq(0).should('contain', secondFakeBlog.title)
      cy.get('.blog').eq(1).should('contain', fakeBlog.title)
    })
  })

  const logIn = (username = fakeUser.username, password = fakeUser.password) => 
  {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
  }

  const logOut = () => 
  {
    cy.get('#logout').click()
  }

  const createBlog = (blog = fakeBlog) =>
  {
    cy.get('#toggable-hidden').click()

    cy.get('#title').clear()
    cy.get('#author').clear()
    cy.get('#url').clear()    

    cy.get('#title').type(blog.title)
    cy.get('#author').type(blog.author)
    cy.get('#url').type(blog.url)

    cy.get('#createBlog').click()
  }
})

