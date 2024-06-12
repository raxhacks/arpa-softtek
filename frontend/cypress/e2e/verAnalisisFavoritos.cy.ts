describe('Ver un análisis favorito', () => {
  beforeEach(function () {
    cy.visit('')
  
    cy.get('[data-cy="iniciar-sesion"]').click()
  
    cy.get('[data-cy="login-correo"]').eq(0).type('correoValido@gmail.com')
    cy.get('[data-cy="login-contrasena"]').eq(0).type('valido-123')
    cy.get('[data-cy="login-boton"]').click()
  })

  it('Visualiza un análisis favorito', () => {
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

    cy.get('[data-cy="boton-favorito"]').should('exist')
    cy.get('[data-cy="boton-favorito"]').click()

    cy.get('[data-cy="header-favoritos"]').click()

    cy.url().should('include', '/Favorites')

    cy.get('[data-cy="lista-favoritos-main"]').should('exist')
    cy.get('[data-cy="lista-favoritos-main"]').should('contain', 'cambioClimatico')
    cy.contains('cambioClimatico').click()

    cy.url().should('include', '/Analisis')
    cy.get('[data-cy="analisis-main"]').should('contain', 'cambioClimatico')
  })
})