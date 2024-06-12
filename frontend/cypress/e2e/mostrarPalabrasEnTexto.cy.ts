describe('Probar el resaltado de palabras clave y oraciones con datos cuantitativos en el resumen', () => {
    
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

    it('Resalta palabras clave en el resumen', () => {
      cy.url().should('include', '/Analisis')

      cy.get('[data-cy="boton-cualitativo-large"]').click()

      cy.get('[data-cy="section-with-word"]').should('not.exist')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(0).click()
      cy.get('[data-cy="section-with-word"]').should('exist')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(1).click()
      cy.get('[data-cy="section-with-word"]').should('exist')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(2).click()
      cy.get('[data-cy="section-with-word"]').should('exist')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(3).click()
      cy.get('[data-cy="section-with-word"]').should('exist')
      cy.get('[data-cy="elemento-palabra-clave"]').eq(4).click()
      cy.get('[data-cy="section-with-word"]').should('exist')
    })
    
    it('Resalta oraciones con datos cuantitativos en el resumen', () => {
      cy.url().should('include', '/Analisis')

      cy.get('[data-cy="boton-cuantitativo-large"]').click()

      cy.get('[data-cy="section-with-word"]').should('not.exist')
      cy.get('[data-cy="elemento-cuantitativo"]').eq(0).click()
      cy.get('[data-cy="section-with-word"]').should('exist')
      cy.get('[data-cy="elemento-cuantitativo"]').eq(1).click()
      cy.get('[data-cy="section-with-word"]').should('exist')
      cy.get('[data-cy="elemento-cuantitativo"]').eq(2).click()
      cy.get('[data-cy="section-with-word"]').should('exist')
    })
  })