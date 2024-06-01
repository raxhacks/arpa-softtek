describe('My first test', () => {
  it('Visits the kitchen sink', () => {
    cy.visit('https://arpa-softtek.vercel.app/')
    
    /*cy.contains('type').click()

    cy.url().should('include', '/commands/actions')

    cy.get('.action-email').type('fake@email.com')

    cy.get('.action-email').should('have.value', 'fake@email.com')*/
  })
})