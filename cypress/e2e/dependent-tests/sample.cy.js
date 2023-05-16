describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com/login')

    cy.get('#email').type(Cypress.env('user_email'))
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click()
    cy.wait(3000)
    
    cy.contains('h1', 'Your Notes').should('be.visible')
  })

  it('CRUD a note', () => {
    //Create a note
    cy.contains('Create a new note').click()

    cy.get('#content').type('My note')
    cy.contains('Create').click()

    //Asserts the note was created
    cy.get('.list-group')
      .should('contain', 'My note')
      .click()

    //Updates the note
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    //Asserts the note was updated
    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)')
      .should('be.visible')
      .click()

    //Deletes the note
    cy.contains('Delete').click()

    //Verifica que a lista tem pelo menos 1 item
    cy.get('.list-group a')
      .its('length')
      .should('be.at.least', 1)

    //Asserts the note was deleted
    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })
})
