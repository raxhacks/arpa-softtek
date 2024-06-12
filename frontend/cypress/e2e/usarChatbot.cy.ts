describe('Usar el chatbot', () => {
  
  /* NOTA IMPORTANTE */

  /* Este analisis NO se debe ejecutar en cypress para no gastar tokens en la IA */
  /* Favor de ejecutarlo de manera manual */
  
  beforeEach(function () {
    cy.visit('')
  
    cy.get('[data-cy="iniciar-sesion"]').click()
  
    cy.get('[data-cy="login-correo"]').eq(0).type('correoValido@gmail.com')
    cy.get('[data-cy="login-contrasena"]').eq(0).type('valido-123')
    cy.get('[data-cy="login-boton"]').click()
  
    cy.get('[data-cy="format-button"]').eq(0).click()
    cy.get('[data-cy="input-PDF"]').selectFile('cambioClimatico.pdf')
    cy.get('[data-cy="confirm"]').click()

    cy.get('[data-cy="palabra-autor"]').eq(0).click()
    cy.get('[data-cy="palabra-autor"]').eq(1).click()
    cy.get('[data-cy="palabra-autor"]').eq(2).click()
    cy.get('[data-cy="palabra-autor"]').eq(3).click()
    cy.get('[data-cy="palabra-autor"]').eq(4).click()
    cy.get('[data-cy="palabra-autor"]').eq(5).click()

    cy.get('[data-cy="palabras-confirm"]').click()
  })
  
  it('Realiza una pregunta en el chat', () => {
    cy.url().should('include', '/Analisis')

    cy.contains('Chatbot').click()
    cy.get('[data-cy="chatbot-main"]').should('exist')

    cy.get('[data-cy="chatbot-input"]').should('exist')
    cy.get('[data-cy="chatbot-boton"]').should('exist')
    cy.get('[data-cy="chatbot-input"]').type('¿De qué trata el documento?')
    cy.get('[data-cy="chatbot-boton"]').click()

    cy.wait(5000)
    cy.get('[data-cy="chatbot-mensaje"]').should('not.contain', 'Error')
  })
})