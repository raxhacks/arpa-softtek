describe('My first test', () => {
  it('Visits my page', () => {
    cy.visit('')
    
    cy.request('POST', 'https://arpa-2mgft7cefq-uc.a.run.app/login', { email: 'correoValido@gmail.com', password: 'valido-123' }).then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property('message', 'Login successful') // true
      }
    )
  })
})