describe('Visualizar el resumen por secciones de un documento', () => {
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

  it('Visualiza el resumen del documento', () => {
    cy.url().should('include', '/Analisis')

    cy.get('[data-cy="section-title"]').should('exist')
  })

  it('Abre y cierra una sección del resumen', () => {
    cy.get('[data-cy="section-title"]').eq(0).click()

    cy.get('[data-cy="section-open"]').should('exist')

    cy.get('[data-cy="section-title"]').eq(0).click()

    cy.get('[data-cy="section-open"]').should('not.exist')
  })
})