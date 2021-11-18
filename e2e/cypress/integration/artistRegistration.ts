import url from '../fixtures/urls.json'
import btnText from '../fixtures/btn_text.json'
import loginCreds from '../fixtures/login_credentials.json'
import input from '../fixtures/input_options.json'
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

describe('Creating a new artist user', () => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
    var randomEmailType = require('random-email')({ domain: 'gmail.com' });
    const fixtureFile = 'testArtistImage.jpg'
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

    it('Click on Join button, select perform option and navigate to signup page', () => {
        cy.contains(btnText.home_join_btn).trigger('mouseover')
        cy.get(btnText.home_join_perform_btn).click()
        cy.url().should('include', url.artist_signup_url)
    })

    it('Verify social signup buttons and email signup buttons are visible', () => {
        cy.get(btnText.artist_signup_facebook).should('be.visible')
        cy.get(btnText.artist_signup_google).should('be.visible')
        cy.get(btnText.artist_signup_twitter).should('be.visible')
        cy.get(btnText.artist_signup_email).should('be.visible')
    })

    it('Create account with email by inputting required details', () => {
        cy.get(btnText.artist_signup_email).click()
        cy.get('#email').type(randomEmailType)
        cy.get('#confirmEmail').type(randomEmailType)
        cy.get('#firstName').type(uniqueNamesGenerator(config))
        cy.get('#lastName').type(uniqueNamesGenerator(config))
        cy.get('#password').type(loginCreds.password)
        cy.get('#confirmPassword').type(loginCreds.password)
        cy.get('input[name="acceptsTos"]').check()
        cy.get(btnText.save_and_continue).click()
    })

    it('Input artist specific details and save the profile', () => {
        cy.url().should('include', url.artist_signup_profile)
        cy.get('#name').type(uniqueNamesGenerator(config))
        cy.get('#actType').click()
        cy.contains(input.performanceType).should('be.visible').click()
        cy.get('#compiledAddress').type(input.artistLocation)
        cy.get('#compiledAddress-option-0').should('be.visible').click()
        cy.get('input[type="file"]').attachFile(fixtureFile)
        cy.get('#sda-signup-artist-create-form').find('img')
        cy.get(btnText.artist_save_profile).click()
        
    });

    it('Verify successful account creation and log out', () => {
        cy.url().should('include', url.artist_host_profile_creation)
        cy.get('#sda-nav-menu-open-button').click()
        cy.get(btnText.log_out).click()
        cy.get(btnText.log_in).should('be.visible')

    })



})