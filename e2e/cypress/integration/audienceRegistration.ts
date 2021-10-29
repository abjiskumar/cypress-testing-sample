import url from '../fixtures/urls.json'
import btnText from '../fixtures/btn_text.json'
import loginCreds from '../fixtures/login_credentials.json'

describe('Creating a new User', () => {
    
    var randomEmailType = require('random-email')({ domain: 'gmail.com' });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    it('Navigate to Side Door home page', function(){
        cy.visit((url.base_url))
        cy.url().should('include', url.home_url)
    })

    it('Click on Join button, select watch option and navigate to signup page', function(){
        cy.contains(btnText.home_join_btn).trigger('mouseover')
        cy.contains(btnText.home_join_watch_btn).click()
        cy.url().should('include', url.watch_signup_url)
    })

    it('Verify social signup buttons and email signup buttons are visible', function(){
        cy.contains(btnText.watch_signup_facebook)
        cy.contains(btnText.watch_signup_google)
        cy.contains(btnText.watch_signup_twitter)
        cy.contains(btnText.watch_signup_email)
    })

    it('Create account with email by inputting required details', function(){
        cy.contains(btnText.watch_signup_email).click()
        cy.get('#email').type(randomEmailType)
        cy.get('#confirmEmail').type(randomEmailType)
        cy.get('#firstName').type(loginCreds.firstName)
        cy.get('#lastName').type(loginCreds.lastName)
        cy.get('#password').type(loginCreds.password)
        cy.get('#confirmPassword').type(loginCreds.password)
        cy.get('input[name="acceptsTos"]').check()
        cy.contains(btnText.save_and_continue).click()     
    })

    it('Verify successful account creation and log out', function(){
        cy.url().should('include', url.watch_profile_home)
        cy.get('#sda-nav-menu-open-button').click()
        cy.contains(btnText.log_out).click()
        cy.url().should('include', url.watch_profile_home)  

    })

})