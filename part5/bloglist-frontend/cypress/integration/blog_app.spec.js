
describe('log form is shown and', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/reset')
    const user = {
      name: 'Roman',
      username: 'romanpro',
      password: 'mariel0'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user) 
    cy.visit('http://localhost:3000')
  })
  it('is possible with correct credentials', function()  
  {
    cy.get('#login-form-input-username').type('romanpro')
    cy.get('#login-form-input-password').type('mariel0')
    cy.contains('login').click()
    cy.contains('log out').click()
  })
  it('is not possible with incorrect credentials', function(){
    cy.get('#login-form-input-username').type('romanpo')
    cy.get('#login-form-input-password').type('marie0')
    cy.contains('login').click()
  })
}
)
describe('blog app',()=>{
  beforeEach(function() {
    
    cy.request('POST', 'http://localhost:3003/api/reset')
    const user = {
      name: 'Roman',
      username: 'romanpro',
      password: 'mariel0'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user) 
    
    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'romanpro', password: 'mariel0'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })
  describe('When logged in', function() {
    
    it('a blog can be created and liked', function() {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('like').click()
    })
    it('a blog can be deleted',function() {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('delete').click()
    })
  })
})