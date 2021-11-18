import url from '../fixtures/urls.json'
import btnText from '../fixtures/btn_text.json'
import loginCreds from '../fixtures/login_credentials.json'
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

describe('Creating a new audience user ', () => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
    var randomEmailType = require('random-email')({ domain: 'gmail.com' });
    const config: Config = {
        dictionaries: [names]
      }
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    it('Navigate to Side Door home page', () => {
        cy.visit((url.base_url))
        cy.url().should('include', url.home_url)
    })

    it('Click on Join button, select watch option and navigate to signup page', () => {
        cy.contains(btnText.home_join_btn).trigger('mouseover')
        cy.get(btnText.home_join_watch_btn).click()
        cy.url().should('include', url.watch_signup_url)
    })

    it('Verify social signup buttons and email signup buttons are visible', () => {
        cy.get(btnText.watch_signup_facebook).should('be.visible')
        cy.get(btnText.watch_signup_google).should('be.visible')
        cy.get(btnText.watch_signup_twitter).should('be.visible')
        cy.get(btnText.watch_signup_email).should('be.visible')
    })

    it('Create account with email by inputting required details', () => {
        cy.get(btnText.watch_signup_email).click()
        cy.get('#email').type(randomEmailType)
        cy.get('#confirmEmail').type(randomEmailType)
        cy.get('#firstName').type(uniqueNamesGenerator(config))
        cy.get('#lastName').type(uniqueNamesGenerator(config))
        cy.get('#password').type(loginCreds.password)
        cy.get('#confirmPassword').type(loginCreds.password)
        cy.get('input[name="acceptsTos"]').check()
        cy.get(btnText.save_and_continue).click()     
    })

    it('Verify successful account creation and click on a show', () => {
        cy.url().should('include', url.watch_profile_home)
        cy.contains(btnText.home_browse).trigger('mouseover')
        cy.get(btnText.home_browse_shows).should('be.visible').click()
        cy.url().should('include', url.home_browse_shows)
        cy.contains(btnText.purchase_show_selection_text).should('be.visible').click()
        cy.get('#sda-shows-details-ticket-loader-tickets-button').should('be.visible').click()
        cy.contains(btnText.purchase_ticket_button).should('be.visible').click()
        cy.wait(5000)
        cy.get('#sda-shows-order-buy-button').should('be.visible')
        cy.get('#name').should('be.visible').type(uniqueNamesGenerator(config))
        cy.get('#name').clear().type(uniqueNamesGenerator(config))
        cy.get('#sda-credit-card-number-input').children('input').should('be.visible').type('4242424242424242')
        cy.get('#sda-credit-card-number-input').children('input').clear().type('4242424242424242')
        cy.get('#sda-credit-card-expiry-input').should('be.visible').type('1023')
        cy.get('#sda-credit-card-expiry-input').clear().type('1023')      
        cy.get('#sda-credit-card-cvc-input').should('be.visible').type('564')
        cy.get('#sda-shows-order-buy-button').should('be.visible').click()

    })

})