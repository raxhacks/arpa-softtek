describe('Probar la carga de archivos PDF', () => {
  beforeEach(function () {
    cy.visit('')

    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-correo"]').eq(0).type('correoValido@gmail.com')
    cy.get('[data-cy="login-contrasena"]').eq(0).type('valido-123')
    cy.get('[data-cy="login-boton"]').click()
  })

  it('Accede a la pantalla de "cargar PDF" y se devuelve a la pantalla principal', () => {
    cy.url().should('include', '/CargarArchivos')
    cy.get('[data-cy="cargar-header"]').should('contain', 'Selecciona el formato del artículo')

    cy.get('[data-cy="format-button"]').eq(0).click()
    cy.get('[data-cy="cargar-header"]').should('contain', 'Sube el artículo en formato PDF')

    cy.get('[data-cy="cargar-atras"]').click()
    cy.get('[data-cy="cargar-header"]').should('contain', 'Selecciona el formato del artículo')
  })

  it('Carga un archivo inválido', () => {
    cy.get('[data-cy="format-button"]').eq(0).click()
    cy.get('[data-cy="cargar-header"]').should('contain', 'Sube el artículo en formato PDF')

    cy.get('[data-cy="input-PDF"]').should('be.empty')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')

    cy.get('[data-cy="input-PDF"]').should('be.empty').selectFile('testDOCX.docx')
    cy.get('[data-cy="error-format"]').should('exist')
    cy.get('[data-cy="cargar-main"]').should('contain', 'testDOCX.docx')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')

    cy.get('[data-cy="input-PDF"]').selectFile('testTXT.txt', { action: 'drag-drop', force: true })
    cy.get('[data-cy="error-format"]').should('exist')
    cy.get('[data-cy="cargar-main"]').should('contain', 'testTXT.txt')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')

    //Prueba para archivos muy pesados
    /*cy.get('[data-cy="input-PDF"]').should('be.empty').selectFile('testDOCX.docx')
    cy.get('[data-cy="error-format"]').should('exist')*/
  })

  it('Carga un archivo válido', () => {
    cy.get('[data-cy="format-button"]').eq(0).click()
    cy.get('[data-cy="cargar-header"]').should('contain', 'Sube el artículo en formato PDF')

    cy.get('[data-cy="input-PDF"]').should('be.empty')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Siguiente')

    cy.get('[data-cy="input-PDF"]').should('be.empty').selectFile('testPDF.pdf')
    cy.get('[data-cy="confirm"]').should('exist')
    cy.get('[data-cy="cargar-main"]').should('contain', 'testPDF.pdf')
    cy.get('[data-cy="cargar-main"]').should('not.contain', 'Error')

    cy.get('[data-cy="confirm"]').click()
    cy.url().should('include', '/CargarArchivos')
    cy.get('[data-cy="palabras-main"]').should('contain', 'Seleccione las palabras clave para realizar su análisis')
  })
})