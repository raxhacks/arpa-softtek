describe('My first test', () => {
  it('Visits my page', () => {
    cy.visit('')

    cy.contains('Iniciar sesión')
    cy.contains('Registrarse')
    
    /*cy.contains('type').click()

    cy.url().should('include', '/commands/actions')

    cy.get('.action-email').type('fake@email.com')

    cy.get('.action-email').should('have.value', 'fake@email.com')*/
  })
})