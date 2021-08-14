/// <reference types="cypress" />

describe('Greetings functionality', () => {
  it('should navigate to greetings page and confirm everything is there', () => {
    cy.visit('http://localhost:3000')
    cy.wait(1000)
    cy.get('#greeting-nav-button').click()
    cy.wait(1000)
    cy.get('#greetings-input').type('Evgeny', { delay: 400 })
    cy.wait(1000)
    cy.get('#greetings-show-button').click()
    cy.wait(1000)
    cy.get('#greeting-text').should('include.text', 'Hello Evgeny!')
    cy.percySnapshot()
    cy.wait(4000)
  })
})
