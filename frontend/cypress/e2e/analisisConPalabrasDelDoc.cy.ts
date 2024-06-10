describe('Probar el análisis de un documento usando palabras clave encontradas en el mismo', () => {
  beforeEach(function () {
    cy.visit('')

    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-correo"]').eq(0).type('correoValido@gmail.com')
    cy.get('[data-cy="login-contrasena"]').eq(0).type('valido-123')
    cy.get('[data-cy="login-boton"]').click()

    /*cy.get('[data-cy="login-correo"]').eq(0).type('user@gmail.com')
    cy.get('[data-cy="login-contrasena"]').eq(0).type('password1.')
    cy.get('[data-cy="login-boton"]').click()*/

    /*cy.get('[data-cy="login-correo"]').eq(0).type('angel@gmail.com')
    cy.get('[data-cy="login-contrasena"]').eq(0).type('angel-123')
    cy.get('[data-cy="login-boton"]').click()*/

    cy.get('[data-cy="format-button"]').eq(0).click()
    cy.get('[data-cy="input-PDF"]').should('be.empty').selectFile('cambioClimatico.pdf')
    cy.get('[data-cy="confirm"]').click()
  })

  it('Muestra las palabras clave del documento', () => {
    cy.get('[data-cy="palabras-main"]').should('contain', '¿Cómo le gustaría realizar el análisis?')
    cy.get('[data-cy="palabras-main"]').should('contain', 'Palabras clave del documento')

    cy.get('[data-cy="palabra-autor"]').should('have.length', 10)
    cy.get('[data-cy="palabras-main"]').should('contain', 'CAMBIO CLIMÁTICO')
    cy.get('[data-cy="palabras-main"]').should('contain', 'CAMBIO')
    cy.get('[data-cy="palabras-main"]').should('contain', 'CLIMÁTICO')
    cy.get('[data-cy="palabras-main"]').should('contain', 'cambios')
    cy.get('[data-cy="palabras-main"]').should('contain', 'Díaz Cordero')
    cy.get('[data-cy="palabras-main"]').should('contain', 'Desarrollo Humano')
    cy.get('[data-cy="palabras-main"]').should('contain', 'Santo Domingo')
    cy.get('[data-cy="palabras-main"]').should('contain', 'desarrollo')
    cy.get('[data-cy="palabras-main"]').should('contain', 'Sociedad')
    cy.get('[data-cy="palabras-main"]').should('contain', 'siglo XXI')
  })

  it('Cambia a la sección de "palabras propias" y se regresa a la sección de "palabras del documento"', () => {
    cy.get('[data-cy="palabras-main"]').should('contain', '¿Cómo le gustaría realizar el análisis?')
    cy.get('[data-cy="palabras-main"]').should('contain', 'Mis propias palabras clave')

    cy.contains('Mis propias palabras clave').click()
    cy.get('[data-cy="palabras-main"]').should('not.contain', 'CAMBIO CLIMÁTICO')

    cy.contains('Palabras clave del documento').click()
    cy.get('[data-cy="palabras-main"]').should('contain', 'CAMBIO CLIMÁTICO')
  })

  it('Ejecuta el analisis con las palabras clave del documento', () => {
    cy.log('Esta prueba no se ejecutó en Cypress a fin de evitar el gasto innecesario de tokens en nuestra IA')
    //cy.get('[data-cy="palabras-confirm"]').click()
  })
})