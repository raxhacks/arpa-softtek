describe('Probar el registro', () => {
  it('Muestra la tab de registro', () => {
    cy.visit('')

    cy.get('[data-cy="registrarse"]').click()

    cy.get('[data-cy="registro-correo"]').should('exist')
    cy.get('[data-cy="registro-contrasena"]').should('exist')
    cy.get('[data-cy="registro-boton"]').should('exist')
  })

  it('Escribe datos en los campos', () => {
    cy.visit('')
    
    cy.get('[data-cy="registrarse"]').click()
    cy.get('[data-cy="registro-correo"]').type('testemail@gmail.com')
    cy.get('[data-cy="registro-contrasena"]').type('contrasena-123')

    cy.get('[data-cy="registro-correo"]').should('have.value', 'testemail@gmail.com')
    cy.get('[data-cy="registro-contrasena"]').should('have.value', 'contrasena-123')
  })

  it('Escribe un correo incorrecto', () => {
    cy.visit('')
    
    cy.get('[data-cy="registrarse"]').click()
    cy.get('[data-cy="registro-contrasena"]').type('contrasena-123')

    cy.get('[data-cy="registro-correo"]').type(' ')
    cy.get('[data-cy="registro-boton"]').click()
    cy.contains('Por favor ingrese un correo electrónico válido').should('contain', 'Por favor ingrese un correo electrónico válido')
    
    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('bademail')
    cy.get('[data-cy="registro-boton"]').click()
    cy.contains('Por favor ingrese un correo electrónico válido').should('contain', 'Por favor ingrese un correo electrónico válido')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('bademail@gmail')
    cy.get('[data-cy="registro-boton"]').click()
    cy.contains('Por favor ingrese un correo electrónico válido').should('contain', 'Por favor ingrese un correo electrónico válido')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('@gmail.com')
    cy.get('[data-cy="registro-boton"]').click()
    cy.contains('Por favor ingrese un correo electrónico válido').should('contain', 'Por favor ingrese un correo electrónico válido')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type(' bademail@gmail.com')
    cy.get('[data-cy="registro-boton"]').click()
    cy.contains('Por favor ingrese un correo electrónico válido').should('contain', 'Por favor ingrese un correo electrónico válido')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('bademail@gmail.com ')
    cy.get('[data-cy="registro-boton"]').click()
    cy.contains('Por favor ingrese un correo electrónico válido').should('contain', 'Por favor ingrese un correo electrónico válido')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('bademail@gmail. com')
    cy.get('[data-cy="registro-boton"]').click()
    cy.contains('Por favor ingrese un correo electrónico válido').should('contain', 'Por favor ingrese un correo electrónico válido')
  })

  it('Escribe una contraseña incorrecta', () => {
    cy.visit('')
    
    cy.get('[data-cy="registrarse"]').click()
    cy.get('[data-cy="registro-correo"]').type('correo@gmail.com')

    cy.get('[data-cy="registro-contrasena"]').type(' ')
    cy.get('[data-cy="registro-boton"]').click()
    cy.contains('- Ser más larga de 7 caracteres.').should('contain', '- Ser más larga de 7 caracteres.')
    cy.contains('- Contener al menos una letra.').should('contain', '- Contener al menos una letra.')
    cy.contains('- Contener al menos un numero.').should('contain', '- Contener al menos un numero.')
    cy.contains('- Contener al menos un caracter especial.').should('contain', '- Contener al menos un caracter especial.')
    
    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('bad')
    cy.get('[data-cy="registro-boton"]').click()
    cy.contains('- Ser más larga de 7 caracteres.').should('contain', '- Ser más larga de 7 caracteres.')
    cy.contains('- Contener al menos una letra.').should('contain', '- Contener al menos una letra.')
    cy.contains('- Contener al menos un numero.').should('contain', '- Contener al menos un numero.')
    cy.contains('- Contener al menos un caracter especial.').should('contain', '- Contener al menos un caracter especial.')
  })
})