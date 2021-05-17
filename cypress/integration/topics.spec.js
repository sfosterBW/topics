/// <reference types="cypress" />
import data from '../fixtures/topics.json'

const url = 'http://localhost:3000'

context('Topics', () => {
  beforeEach(() => {
    cy.visit(url)
    cy.title().should('eq', 'My Topics Challenge')
  })

  it('has a title', () => {
    cy.get('h1').should('have.text', 'My Topics Challenge')
  })

  context('Word cloud', () => {
    it('has a word cloud section', () => {
      cy.get('main>section h2').first().should('have.text', 'Word cloud')
    })

    it('has a list of topics that matches the number of topics', () => {
      cy.get('.cloud li').should('have.length', data.topics.length)
    })
  })

  context('Total Stats', () => {
    it('has a Total stats section', () => {
      cy.get('main>section h2').last().should('have.text', 'Total stats')
    })

    it('displays total positive mentions in green', () => {
      cy.get('.sentiment-content>div p').eq(1).should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('displays total neutral mentions in gray', () => {
      cy.get('.sentiment-content>div p').eq(2).should('have.css', 'color', 'rgb(128, 128, 128)')
    })

    it('displays total negative mentions in red', () => {
      cy.get('.sentiment-content>div p').eq(3).should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})