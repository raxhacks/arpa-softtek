describe('Probar el análisis de un documento usando palabras clave encontradas en el mismo', () => {
  beforeEach(function () {
    cy.visit('')

    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-correo"]').eq(0).type('correoValido@gmail.com')
    cy.get('[data-cy="login-contrasena"]').eq(0).type('valido-123')
    cy.get('[data-cy="login-boton"]').click()

    cy.get('[data-cy="format-button"]').eq(0).click()
    cy.get('[data-cy="input-PDF"]').should('be.empty').selectFile('cambioClimatico.pdf')
    cy.get('[data-cy="confirm"]').click()
  })

  it('Muestra las palabras clave del documento', () => {
    cy.get('[data-cy="palabras-main"]').should('contain', 'Seleccione las palabras clave para realizar su análisis')

    cy.get('[data-cy="palabra-autor"]').should('have.length', 10)
    cy.get('[data-cy="palabra-autor"]').should('contain', 'CAMBIO CLIMÁTICO')
    cy.get('[data-cy="palabra-autor"]').should('contain', 'CAMBIO')
    cy.get('[data-cy="palabra-autor"]').should('contain', 'CLIMÁTICO')
    cy.get('[data-cy="palabra-autor"]').should('contain', 'cambios')
    cy.get('[data-cy="palabra-autor"]').should('contain', 'Díaz Cordero')
    cy.get('[data-cy="palabra-autor"]').should('contain', 'Desarrollo Humano')
    cy.get('[data-cy="palabra-autor"]').should('contain', 'Santo Domingo')
    cy.get('[data-cy="palabra-autor"]').should('contain', 'desarrollo')
    cy.get('[data-cy="palabra-autor"]').should('contain', 'Sociedad')
    cy.get('[data-cy="palabra-autor"]').should('contain', 'siglo XXI')
  })

  it('Ejecuta el analisis con palabras clave del documento', () => {
    cy.get('[data-cy="palabra-autor"]').eq(0).click()
    cy.get('[data-cy="palabra-autor"]').eq(1).click()
    cy.get('[data-cy="palabra-autor"]').eq(2).click()
    cy.get('[data-cy="palabra-autor"]').eq(3).click()
    cy.get('[data-cy="palabra-autor"]').eq(5).click()

    cy.get('[data-cy="palabra-propia"]').should('have.length', 5)
    cy.get('[data-cy="palabra-propia"]').should('contain', 'CAMBIO CLIMÁTICO')
    cy.get('[data-cy="palabra-propia"]').should('contain', 'CAMBIO')
    cy.get('[data-cy="palabra-propia"]').should('contain', 'CLIMÁTICO')
    cy.get('[data-cy="palabra-propia"]').should('contain', 'cambios')
    cy.get('[data-cy="palabra-propia"]').should('contain', 'Desarrollo Humano')

    cy.log('Esta prueba no se ejecutó completamente en Cypress a fin de evitar el gasto innecesario de tokens en nuestra IA')
    //cy.get('[data-cy="palabras-confirm"]').click()
  })
})