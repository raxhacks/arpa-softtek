describe('Ver el historial de análisis', () => {
  
  /* NOTA IMPORTANTE */

  /* Este analisis NO se debe ejecutar en cypress para no gastar tokens en la IA */
  /* Favor de ejecutarlo de manera manual */
  
  beforeEach(function () {
    cy.visit('')
  
    cy.get('[data-cy="iniciar-sesion"]').click()
  
    cy.get('[data-cy="login-correo"]').eq(0).type('correoValido@gmail.com')
    cy.get('[data-cy="login-contrasena"]').eq(0).type('valido-123')
    cy.get('[data-cy="login-boton"]').click()
  })

  it('Guarda un análisis en el historial', () => {
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

    cy.url().should('include', '/Analisis')

    cy.get('[data-cy="header-historial"]').click()

    cy.url().should('include', '/History')

    cy.get('[data-cy="lista-historial-main"]').should('exist')
    cy.get('[data-cy="lista-historial-main"]').should('contain', 'cambioClimatico')
  })

  it('Accede a un análisis desde el historial', () => {
    cy.get('[data-cy="header-historial"]').click()

    cy.url().should('include', '/History')

    cy.get('[data-cy="lista-historial-main"]').should('exist')
    cy.get('[data-cy="lista-historial-main"]').should('contain', 'cambioClimatico')
    cy.contains('cambioClimatico').click()

    cy.url().should('include', '/Analisis')
    cy.get('[data-cy="analisis-main"]').should('contain', 'cambioClimatico')
  })
})