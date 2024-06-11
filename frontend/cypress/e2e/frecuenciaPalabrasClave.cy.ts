describe('Probar la visualización de una lista con la frecuencia de palabras clave en el documento', () => {
    beforeEach(function () {
      cy.visit('')
  
      cy.get('[data-cy="iniciar-sesion"]').click()
  
      cy.get('[data-cy="login-correo"]').eq(0).type('correoValido@gmail.com')
      cy.get('[data-cy="login-contrasena"]').eq(0).type('valido-123')
      cy.get('[data-cy="login-boton"]').click()
  
      cy.get('[data-cy="format-button"]').eq(0).click()
      cy.get('[data-cy="input-PDF"]').selectFile('cambioClimatico.pdf')
      cy.get('[data-cy="confirm"]').click()
    })
  
    it('Muestra una lista de frecuencias usando sólo palabras clave del autor', () => {
      cy.get('[data-cy="palabra-autor"]').eq(0).click()
      cy.get('[data-cy="palabra-autor"]').eq(1).click()
      cy.get('[data-cy="palabra-autor"]').eq(2).click()
      cy.get('[data-cy="palabra-autor"]').eq(3).click()
      cy.get('[data-cy="palabra-autor"]').eq(4).click()
      cy.get('[data-cy="palabra-autor"]').eq(5).click()
      cy.get('[data-cy="palabra-autor"]').eq(6).click()
      cy.get('[data-cy="palabra-autor"]').eq(7).click()
      cy.get('[data-cy="palabra-autor"]').eq(8).click()
  
      cy.get('[data-cy="palabras-confirm"]').click()
      
      cy.url().should('include', '/Analisis')

      cy.get('[data-cy="boton-cualitativo-large"]').click()
      cy.get('[data-cy="elemento-palabra-clave"]').should('have.length', 10)
    })

    it('Muestra una lista de frecuencias usando sólo palabras propias del usuario', () => {
      cy.get('[data-cy="input-propia"]').eq(0).type('Cambio')
      cy.get('[data-cy="input-propia"]').eq(0).type('Climático')
      cy.get('[data-cy="input-propia"]').eq(0).type('cambio')
      cy.get('[data-cy="input-propia"]').eq(0).type('climático')
      cy.get('[data-cy="input-propia"]').eq(0).type('clima')
      cy.get('[data-cy="input-propia"]').eq(0).type('calentamiento')
      cy.get('[data-cy="input-propia"]').eq(0).type('sol')
      cy.get('[data-cy="input-propia"]').eq(0).type('calor')
      cy.get('[data-cy="input-propia"]').eq(0).type('Tierra')
      cy.get('[data-cy="input-propia"]').eq(0).type('planeta')
  
      cy.get('[data-cy="palabras-confirm"]').click()
      
      cy.url().should('include', '/Analisis')

      cy.get('[data-cy="boton-cualitativo-large"]').click()
      cy.get('[data-cy="elemento-palabra-clave"]').should('have.length', 10)
      cy.get('[data-cy="elemento-palabra-clave"]').eq(0).should('contain', 'Cambio')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(1).should('contain', 'Climático')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(2).should('contain', 'cambio')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(3).should('contain', 'climático')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(4).should('contain', 'clima')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(5).should('contain', 'calentamiento')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(6).should('contain', 'sol')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(7).should('contain', 'calor')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(8).should('contain', 'Tierra')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(9).should('contain', 'planeta')
    })

    it('Muestra una lista de frecuencias usando palabras mixtas', () => {
      cy.get('[data-cy="palabra-autor"]').eq(0).click()
      cy.get('[data-cy="palabra-autor"]').eq(1).click()
      cy.get('[data-cy="palabra-autor"]').eq(2).click()
      cy.get('[data-cy="input-propia"]').eq(0).type('clima')
      cy.get('[data-cy="input-propia"]').eq(0).type('calentamiento')
      cy.get('[data-cy="input-propia"]').eq(0).type('sol')
  
      cy.get('[data-cy="palabras-confirm"]').click()
      
      cy.url().should('include', '/Analisis')

      cy.get('[data-cy="boton-cualitativo-large"]').click()
      cy.get('[data-cy="elemento-palabra-clave"]').should('have.length', 10)
      cy.get('[data-cy="elemento-palabra-clave"]').eq(3).should('contain', 'clima')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(4).should('contain', 'calentamiento')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(5).should('contain', 'sol')
    })
  })