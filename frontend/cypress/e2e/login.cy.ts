describe('Probar el inicio de sesión', () => {
  it('Muestra la tab de inicio de sesión', () => {
    cy.visit('')

    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-correo"]').should('exist')
    cy.get('[data-cy="login-contrasena"]').should('exist')
    cy.get('[data-cy="login-boton"]').should('exist')
  })

  it('Se regresa a la tab principal', () => {
    cy.visit('')

    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-atras"]').click()

    cy.get('[data-cy="login-correo"]').should('not.exist')
    cy.get('[data-cy="login-contrasena"]').should('not.exist')
    cy.get('[data-cy="login-boton"]').should('not.exist')
  })

  it('Escribe datos en los campos', () => {
    cy.visit('')
    
    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-correo"]').type('testemail@gmail.com')
    cy.get('[data-cy="login-contrasena"]').type('contrasena-123')

    cy.get('[data-cy="login-correo"]').should('have.value', 'testemail@gmail.com')
    cy.get('[data-cy="login-contrasena"]').should('have.value', 'contrasena-123')
  })

  it('Deja los campos en blanco', () => {
    cy.visit('')
    
    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-boton"]').click()

    cy.get('[data-cy="login-correo"]').should('have.value', '')
    cy.get('[data-cy="login-contrasena"]').should('have.value', '')

    //cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')
  })

  it('Escribe un correo y una contraseña no existentes', () => {
    cy.visit('')
    
    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-correo"]').type('correoNoExistente@gmail.com')
    cy.get('[data-cy="login-contrasena"]').type('contrasena-456')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')
  })

  it('Escribe un correo correcto, pero contraseña incorrecta', () => {
    cy.visit('')
    
    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-correo"]').type('user@gmail.com')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-contrasena"]').should('have.value', '')
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-contrasena"]').clear()
    cy.get('[data-cy="login-contrasena"]').type('       ')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-contrasena"]').clear()
    cy.get('[data-cy="login-contrasena"]').type('!-.=#$/+')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-contrasena"]').clear()
    cy.get('[data-cy="login-contrasena"]').type('password2.')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-contrasena"]').clear()
    cy.get('[data-cy="login-contrasena"]').type(' password1.')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-contrasena"]').clear()
    cy.get('[data-cy="login-contrasena"]').type('password 1.')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-contrasena"]').clear()
    cy.get('[data-cy="login-contrasena"]').type('password1. ')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-contrasena"]').clear()
    cy.get('[data-cy="login-contrasena"]').type('passwod1.')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')
  })

  it('Escribe una contraseña correcta, pero un correo incorrecto', () => {
    cy.visit('')
    
    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-contrasena"]').type('password1.')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-correo"]').should('have.value', '')
    //cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-correo"]').clear()
    cy.get('[data-cy="login-correo"]').type('       ')
    cy.get('[data-cy="login-boton"]').click()
    //cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-correo"]').clear()
    cy.get('[data-cy="login-correo"]').type('!-=#$/+')
    cy.get('[data-cy="login-boton"]').click()
    //cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-correo"]').clear()
    cy.get('[data-cy="login-correo"]').type('user')
    cy.get('[data-cy="login-boton"]').click()
    //cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-correo"]').clear()
    cy.get('[data-cy="login-correo"]').type('@gmail.com')
    cy.get('[data-cy="login-boton"]').click()
    //cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-correo"]').clear()
    cy.get('[data-cy="login-correo"]').type(' user@gmail.com')
    cy.get('[data-cy="login-boton"]').click()
    //cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-correo"]').clear()
    cy.get('[data-cy="login-correo"]').type('user@ gmail.com')
    cy.get('[data-cy="login-boton"]').click()
    //cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-correo"]').clear()
    cy.get('[data-cy="login-correo"]').type('user@gmail.com ')
    cy.get('[data-cy="login-boton"]').click()
    //cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-correo"]').clear()
    cy.get('[data-cy="login-correo"]').type('use@gmail.com')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')

    cy.get('[data-cy="login-correo"]').clear()
    cy.get('[data-cy="login-correo"]').type('user@mail.com')
    cy.get('[data-cy="login-boton"]').click()
    cy.get('[data-cy="login-tab"]').should('contain', 'Credenciales incorrectas')
  })

  it('Ingresa un correo y una contraseña correctos', () => {
    cy.visit('')
    cy.intercept('**').as('allRequests');
    
    cy.get('[data-cy="iniciar-sesion"]').click()

    cy.get('[data-cy="login-correo"]').eq(0).type('correoValido@gmail.com')
    cy.get('[data-cy="login-contrasena"]').eq(0).type('valido-123')

    /*const otherRequest = {
      email: 'user@gmail.com',
      password: 'password1.',
    };

    cy.request({
      method: 'POST',
      url: 'https://arpa-2mgft7cefq-uc.a.run.app/login',
      body: otherRequest,
      headers: {
        'content-type': 'application/json',
      },
    });*/

    cy.get('[data-cy="login-boton"]').click()

    cy.wait('@allRequests').then((interception) => {
      const requestUrl = interception.request.url;
      const requestMethod = interception.request.method;
      const requestBody = interception.request.body;
      const requestHeaders = interception.request.headers;
      cy.log(`Solicitud realizada a: ${requestMethod} ${requestUrl}`);
      cy.log(`${JSON.stringify(requestHeaders)}`)
      cy.log(`${JSON.stringify(requestBody)}`)

      if (interception.response) {
        const responseBody = interception.response.body;
        cy.log(`Respuesta del servidor: ${JSON.stringify(responseBody)}`);
      } else {
        cy.log('La solicitud no tiene respuesta.');
      }
    });

    cy.get('[data-cy="login-tab"]').should('not.contain', 'Credenciales incorrectas')

    cy.url().should('include', '/CargarArchivos')
  })
})