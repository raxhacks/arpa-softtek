describe('Probar el registro', () => {
  it('Muestra la tab de registro', () => {
    cy.visit('')

    cy.get('[data-cy="registrarse"]').click()

    cy.get('[data-cy="registro-correo"]').should('exist')
    cy.get('[data-cy="registro-contrasena"]').should('exist')
    cy.get('[data-cy="registro-boton"]').should('exist')
  })

  it('Se regresa a la tab principal', () => {
    cy.visit('')

    cy.get('[data-cy="registrarse"]').click()

    cy.get('[data-cy="registro-atras"]').click()

    cy.get('[data-cy="registro-correo"]').should('not.exist')
    cy.get('[data-cy="registro-contrasena"]').should('not.exist')
    cy.get('[data-cy="registro-boton"]').should('not.exist')
  })

  it('Escribe datos en los campos', () => {
    cy.visit('')
    
    cy.get('[data-cy="registrarse"]').click()

    cy.get('[data-cy="registro-correo"]').type('testemail@gmail.com')
    cy.get('[data-cy="registro-contrasena"]').type('contrasena-123')

    cy.get('[data-cy="registro-correo"]').should('have.value', 'testemail@gmail.com')
    cy.get('[data-cy="registro-contrasena"]').should('have.value', 'contrasena-123')
  })

  it('Deja los campos en blanco', () => {
    cy.visit('')
    
    cy.get('[data-cy="registrarse"]').click()

    cy.get('[data-cy="registro-boton"]').click()

    cy.get('[data-cy="registro-correo"]').should('have.value', '')
    cy.get('[data-cy="registro-contrasena"]').should('have.value', '')

    cy.get('[data-cy="error-correo"]').should('contain', 'Por favor ingrese un correo electrónico válido.')

    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un guión, guión bajo o punto.')
  })

  it('Escribe un correo incorrecto, pero contraseña correcta', () => {
    cy.visit('')
    
    cy.get('[data-cy="registrarse"]').click()

    cy.get('[data-cy="registro-correo"]').type(' ')
    cy.get('[data-cy="registro-contrasena"]').type('contrasena-123')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="error-correo"]').should('contain', 'Por favor ingrese un correo electrónico válido.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')
    
    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('bademail')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="error-correo"]').should('contain', 'Por favor ingrese un correo electrónico válido.')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('bademail@gmail')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="error-correo"]').should('contain', 'Por favor ingrese un correo electrónico válido.')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('@gmail.com')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="error-correo"]').should('contain', 'Por favor ingrese un correo electrónico válido.')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type(' bademail@gmail.com')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="error-correo"]').should('contain', 'Por favor ingrese un correo electrónico válido.')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('bademail@gmail.com ')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="error-correo"]').should('contain', 'Por favor ingrese un correo electrónico válido.')

    cy.get('[data-cy="registro-correo"]').clear()
    cy.get('[data-cy="registro-correo"]').type('bademail@gmail. com')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="error-correo"]').should('contain', 'Por favor ingrese un correo electrónico válido.')
  })

  it('Escribe una contraseña incorrecta, pero correo correcto', () => {
    cy.visit('')
    
    cy.get('[data-cy="registrarse"]').click()

    cy.get('[data-cy="registro-correo"]').type('correo@gmail.com')
    cy.get('[data-cy="registro-contrasena"]').type(' ')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="registro-tab"]').should('not.contain', 'Por favor ingrese un correo electrónico válido.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un guión, guión bajo o punto.')
    
    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('       ')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('bad')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('123')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('---')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('badPassword')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('bad123')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('12-34')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('-_-_-_-')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('1234567')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('bad-p')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('badPassword2')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('bad-Password')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('123-456')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.get('[data-cy="registro-contrasena"]').clear()
    cy.get('[data-cy="registro-contrasena"]').type('bad-12')
    cy.get('[data-cy="registro-boton"]').click()
    cy.get('[data-cy="errores-contrasena"]').should('contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="errores-contrasena"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')
  })

  it('Trata de registrar un correo que ya existe', () => {
    cy.visit('')
    
    cy.get('[data-cy="registrarse"]').click()

    cy.get('[data-cy="registro-correo"]').type('correoExistente@gmail.com')
    cy.get('[data-cy="registro-contrasena"]').type('contrasena-123')
    cy.get('[data-cy="registro-boton"]').click()

    cy.wait(5000)

    cy.get('[data-cy="registro-tab"]').should('contain', 'Esta cuenta ya se encuentra registrada.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', 'Por favor ingrese un correo electrónico válido.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')
  })

  /*it('Registra un usuario con correo y contraseña correctos', () => {
    cy.visit('')
    
    cy.get('[data-cy="registrarse"]').click()

    cy.get('[data-cy="registro-correo"]').type('correoValido@gmail.com')
    cy.get('[data-cy="registro-contrasena"]').type('contrasena-123')
    cy.get('[data-cy="registro-boton"]').click()

    cy.get('[data-cy="registro-tab"]').should('not.contain', 'Esta cuenta ya se encuentra registrada.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', 'Por favor ingrese un correo electrónico válido.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos 7 caracteres.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos una letra.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos un numero.')
    cy.get('[data-cy="registro-tab"]').should('not.contain', '- Contener al menos un guión, guión bajo o punto.')

    cy.url().should('include', '/CargarArchivos')
  })*/
})