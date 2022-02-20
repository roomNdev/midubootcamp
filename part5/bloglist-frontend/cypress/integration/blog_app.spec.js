
describe('log form is shown and', function() {
  beforeEach(function() {
    const user = {
      username: 'romanpro',
      password: 'mariel0'
    }
    cy.resetReq(user)
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
    
    const user = {
      username: 'romanpro',
      password: 'mariel0'
    }
    cy.resetReq(user)
    cy.login(user)
  })
  describe('When logged in', function() {
    
    it('a blog can be created and liked', function() {
      cy.createExampleBlog('new title', 'author', 'url')
      cy.contains('view').click()
      cy.contains('like').click()
    })
    it('a blog can be deleted',function() {
      cy.createExampleBlog('new title', 'author', 'url')
      cy.contains('view').click()
      cy.contains('delete').click()
    })
    describe('and there is multiple blogs',function() {
      beforeEach(function() {
        const blog1 = {
          author: 'second',
          title: 'second',
          url: 'second'
        }
        const blog2 = {
          author: 'first',
          title: 'first',
          url: 'first',
          likes: 3
        }
        cy.createDefaultBlog(blog1)
        cy.createDefaultBlog(blog2)
      })
      it('blogs are ordered by likes',function() {
        cy.get('h2.blogTitle').then((blogs)=>{
          expect(blogs[0]).contain('first')
        })
      })
    })
  })
})