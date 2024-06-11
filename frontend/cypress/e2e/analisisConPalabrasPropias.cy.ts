describe('Probar el análisis de un documento usando palabras clave propias del usuario', () => {
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

  it('Escribe una palabra inválida', () => {
    cy.get('[data-cy="palabras-main"]').should('contain', 'Seleccione las palabras clave para realizar su análisis')

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('   ')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('not.exist')

    cy.get('[data-cy="input-propia"]').eq(0).clear()
    cy.get('[data-cy="input-propia"]').eq(0).type('este es un input muy laaaaaaaaaargo')
    cy.get('[data-cy="input-propia"]').eq(0).should('not.contain', 'este es un input muy laaaaaaaaaargo')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabras-main"]').should('contain', 'este es un input muy laaaaaaaa')

    cy.get('[data-cy="input-propia"]').eq(0).clear()
    cy.get('[data-cy="input-propia"]').eq(0).type('!#$%&/.-_')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').eq(0).should('not.contain', '!#$%&/.-_')

    cy.get('[data-cy="input-propia"]').eq(0).clear()
    cy.get('[data-cy="input-propia"]').eq(0).type('   palabra inválida')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').eq(0).should('not.contain', 'palabra inválida')

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 1)
  })

  it('Escribe y agrega una palabra válida', () => {
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra válida')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').eq(0).should('contain', 'palabra válida')

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('otra palabra   ')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').eq(1).should('contain', 'otra palabra')

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('pal_abra-válid.a')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').eq(2).should('contain', 'pal_abra-válid.a')

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('pa1la2bra3 4vá5li6da7')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').eq(2).should('contain', 'pa1la2bra3 4vá5li6da7')
  })

  it('Escribe y agrega muchas palabras y luego las borra', () => {
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra 1')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 1)

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra 2')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 2)

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra 3')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 3)

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra 4')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 4)

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra 5')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 5)

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra 6')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 6)

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra 7')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 7)

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra 8')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 8)

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('palabra 9')
    cy.get('[data-cy="add-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 9)

    cy.get('[data-cy="input-propia"]').should('not.exist')

    cy.get('[data-cy="delete-propia"]').eq(8).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 8)
    cy.get('[data-cy="input-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')

    cy.get('[data-cy="delete-propia"]').eq(7).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 7)
    cy.get('[data-cy="input-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')

    cy.get('[data-cy="delete-propia"]').eq(6).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 6)
    cy.get('[data-cy="input-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')

    cy.get('[data-cy="delete-propia"]').eq(5).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 5)
    cy.get('[data-cy="input-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')

    cy.get('[data-cy="delete-propia"]').eq(4).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 4)
    cy.get('[data-cy="input-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')

    cy.get('[data-cy="delete-propia"]').eq(3).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 3)
    cy.get('[data-cy="input-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')

    cy.get('[data-cy="delete-propia"]').eq(2).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 2)
    cy.get('[data-cy="input-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')

    cy.get('[data-cy="delete-propia"]').eq(1).click()
    cy.get('[data-cy="palabra-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')

    cy.get('[data-cy="delete-propia"]').eq(0).click()
    cy.get('[data-cy="palabra-propia"]').should('not.exist')
    cy.get('[data-cy="input-propia"]').should('have.length', 1)
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty')
  })

  it('Ejecuta el analisis con palabras clave propias', () => {
    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('cambio')
    cy.get('[data-cy="add-propia"]').eq(0).click()

    cy.get('[data-cy="input-propia"]').eq(0).should('be.empty').type('climático')
    cy.get('[data-cy="add-propia"]').eq(0).click()

    cy.get('[data-cy="palabra-propia"]').should('have.length', 2)

    cy.log('Esta prueba no se ejecutó en Cypress a fin de evitar el gasto innecesario de tokens en nuestra IA')
    //cy.get('[data-cy="palabras-confirm"]').click()
  })
})