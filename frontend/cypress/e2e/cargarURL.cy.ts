describe('Probar la carga de archivos a través de URL', () => {
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
  })

  it('Accede a la pantalla de "cargar con URL" y se devuelve a la pantalla principal', () => {
    cy.url().should('include', '/CargarArchivos')
    cy.get('[data-cy="cargar-header"]').should('contain', 'Selecciona el formato del artículo')

    cy.get('[data-cy="format-button"]').eq(1).click()
    cy.get('[data-cy="cargar-header"]').should('contain', 'Ingresa la URL del artículo')

    cy.get('[data-cy="cargar-atras"]').click()
    cy.get('[data-cy="cargar-header"]').should('contain', 'Selecciona el formato del artículo')
  })

  it('Carga una URL inválida', () => {
    cy.get('[data-cy="format-button"]').eq(1).click()
    cy.get('[data-cy="cargar-header"]').should('contain', 'Ingresa la URL del artículo')

    cy.get('[data-cy="input-URL"]').should('be.empty')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')
    cy.get('[data-cy="confirm-URL"]').click()
    cy.get('[data-cy="error-upload"]').should('exist')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')

    cy.get('[data-cy="input-URL"]').type('EstaEsUnaURLInvalida')
    cy.get('[data-cy="confirm-URL"]').click()
    cy.get('[data-cy="error-upload"]').should('exist')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')

    cy.get('[data-cy="input-URL"]').clear()
    cy.get('[data-cy="input-URL"]').type('http://urlinexistente.com')
    cy.get('[data-cy="confirm-URL"]').click()
    cy.get('[data-cy="error-upload"]').should('exist')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')

    cy.get('[data-cy="input-URL"]').clear()
    cy.get('[data-cy="input-URL"]').type('https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf')
    cy.get('[data-cy="confirm-URL"]').click()
    cy.get('[data-cy="error-upload"]').should('exist')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')

    //Prueba para archivos muy pesados
    /*cy.get('[data-cy="input-PDF"]').should('be.empty').selectFile('testDOCX.docx')
    cy.get('[data-cy="error-format"]').should('exist')*/
  })

  it('Carga unz URL válida', () => {
    cy.get('[data-cy="format-button"]').eq(1).click()
    cy.get('[data-cy="cargar-header"]').should('contain', 'Ingresa la URL del artículo')

    cy.get('[data-cy="input-URL"]').should('be.empty')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')

    cy.get('[data-cy="input-URL"]').type('https://www.csn.es/documents/10182/927506/La+energ%C3%ADa+nuclear+%28Monograf%C3%ADa%29')
    cy.get('[data-cy="confirm-URL"]').click()
    //cy.get('[data-cy="confirm"]').should('exist')
    //cy.get('[data-cy="cargar-main"]').should('not.contain', 'Error')

    //cy.get('[data-cy="confirm"]').click()
    cy.wait(10000)
    cy.url().should('include', '/CargarArchivos')
    cy.get('[data-cy="palabras-main"]').should('contain', '¿Cómo le gustaría realizar el análisis?')
  })
})