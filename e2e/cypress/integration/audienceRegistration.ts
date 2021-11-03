import url from '../fixtures/urls.json'
import btnText from '../fixtures/btn_text.json'
import loginCreds from '../fixtures/login_credentials.json'
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

describe('Creating a new audience user ', () => {
    
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

    it('Verify successful account creation and log out', () => {
        cy.url().should('include', url.watch_profile_home)
        cy.get('#sda-nav-menu-open-button').click()
        cy.get(btnText.log_out).click()
        cy.get(btnText.log_in).should('be.visible')

    })

})