import url from '../fixtures/urls.json'
import btnText from '../fixtures/btn_text.json'
import loginCreds from '../fixtures/login_credentials.json'
import input from '../fixtures/input_options.json'
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

describe('Create a new __ show ', () => {
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

    it('Click on Join button, select host option and navigate to signup page', () => {
        cy.contains(btnText.home_join_btn).trigger('mouseover')
        cy.get(btnText.home_join_host_btn).click()
        cy.url().should('include', url.host_space_signup_url)
    })

    it('Select Space specific buttons and click on create space button', () => {
        cy.get(btnText.space_intent).click()
        cy.get(btnText.space_present_signup).should('be.visible').click()
    })

    it('Verify social signup buttons and email signup buttons are visible', () => {
        cy.get(btnText.space_signup_facebook).should('be.visible')
        cy.get(btnText.space_signup_google).should('be.visible')
        cy.get(btnText.space_signup_twitter).should('be.visible')
        cy.get(btnText.space_signup_email).should('be.visible')
    })

    it('Create account with email by inputting required details', () => {
        cy.get(btnText.space_signup_email).click()
        cy.get('#email').type(randomEmailType)
        cy.get('#confirmEmail').type(randomEmailType)
        cy.get('#firstName').type(uniqueNamesGenerator(config))
        cy.get('#lastName').type(uniqueNamesGenerator(config))
        cy.get('#password').type(loginCreds.password)
        cy.get('#confirmPassword').type(loginCreds.password)
        cy.get('input[name="acceptsTos"]').check()
        cy.get(btnText.save_and_continue).click()     
    })

    it('Select type of venue and fill venue specific details to save the profile', () =>{
        cy.get('[type="radio"]').first().check()
        cy.get(btnText.space_create).click()
        cy.url().should('include', url.artist_host_profile_creation)
        cy.get('#compiledAddress').type(input.spaceLocation, {force:true})
        cy.get('#compiledAddress').clear().type(input.spaceLocation, {force:true});
        cy.get('#compiledAddress-option-0').should('be.visible').click()
        cy.get(btnText.space_save_continue).should('be.visible').click()

    })

    it('Verify successful account creation and log out', () => {
        cy.url().should('equal', url.host_profile_complete)
        cy.get('#sda-nav-menu-dashboard-main-tab').click();
        cy.url().should('equal', url.manage_dashboard)
        cy.contains(btnText.plan_new_show).click()
        cy.url().should('include', url.show_plan_home_page)
        cy.get(btnText.plan_ips_button).click()
        cy.url().should('include', url.create_ips)
        cy.get(btnText.solo_show_button).click()
        cy.url().should('include', url.manage_dashboard_shows)
        cy.get(btnText.chat_tutorial_complete).should('be.visible').click()
        cy.get(btnText.show_preview_button).should('be.visible')
        cy.get(btnText.show_date).click()
        cy.get(input.showDate).click()
        cy.contains(btnText.save_date_button).click()
        









        

    })

})